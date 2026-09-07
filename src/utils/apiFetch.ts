import {apiPaths, apiURL} from "../config/api";

/**
 * Wspólny niski poziom żądań HTTP: fetch + jednorazowa próba odnowienia sesji
 * po wygaśnięciu access tokena (401), potem jeden retry pierwotnego żądania.
 *
 * Przez to miejsce przechodzą `useApi` (fetchData/fetchDataOld) oraz `PlacesContext.load`.
 * Nie trzyma stanu Reacta – może być wołane spoza komponentów.
 */

let refreshPromise: Promise<boolean> | null = null;
let sessionExpiredHandler: (() => void) | null = null;

/** Rejestrowany przez SessionExpiredBridge (wewnątrz AlertProvider). */
export const setSessionExpiredHandler = (fn: (() => void) | null): void => {
    sessionExpiredHandler = fn;
};

// Backend (GlobalExceptionFilter) zwraca błąd guarda jako HTTP 200 z ciałem
// { status: 401, dtc: "Unauthorized" }; /auth/refresh zwraca prawdziwe 401.
// Sprawdzamy oba sygnały.
const isExpired = (res: Response, body: any): boolean =>
    res.status === 401 || body?.status === 401 || body?.dtc === 'Unauthorized';

const runRefresh = (): Promise<boolean> => {
    if (!refreshPromise) {
        refreshPromise = fetch(apiURL + apiPaths.refresh, {
            method: 'POST',
            headers: {Accept: 'application/json'},
            credentials: 'include',
        })
            .then((r) => r.ok)
            .catch(() => false)
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
};

export const apiFetch = async (apiPatch: string, init: RequestInit): Promise<Response> => {
    const doFetch = () => fetch(apiURL + apiPatch, {...init, credentials: 'include'});

    const res = await doFetch();

    // /auth/refresh i /auth/login same w sobie nie podlegają pętli odnawiania.
    if (apiPatch === apiPaths.refresh || apiPatch === apiPaths.login) {
        return res;
    }

    let body: any;
    try {
        body = await res.clone().json();
    } catch {
        // odpowiedź nie jest JSON-em – nie ma czego sprawdzać
    }
    if (!isExpired(res, body)) {
        return res;
    }

    const refreshed = await runRefresh();
    if (!refreshed) {
        sessionExpiredHandler?.();
        return res; // terminalne – zwracamy oryginalną (nieudaną) odpowiedź
    }
    return await doFetch(); // jeden retry po udanym odnowieniu
};
