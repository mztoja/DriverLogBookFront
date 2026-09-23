import {createContext, ReactNode, useCallback, useMemo, useRef, useState} from 'react';
import {FriendsListInterface} from 'types';
import {apiPaths} from '../config/api';
import {apiFetch} from '../utils/apiFetch';

interface FriendsCtx {
    friends: FriendsListInterface | null; // null = jeszcze nie pobrano / błąd
    loading: boolean;
    ensureFriends: () => void;             // pobierz, jeśli listy nie ma (leniwie, z dedupe)
    refreshFriends: () => Promise<void>;   // wymuś pobranie i podmień (po zaproszeniu/akceptacji/odrzuceniu)
}

export const FriendsContext = createContext<FriendsCtx>({
    friends: null,
    loading: false,
    ensureFriends: () => {},
    refreshFriends: async () => {},
});

interface Props {
    children?: ReactNode;
}

export const FriendsProvider = ({children}: Props) => {
    const [friends, setFriends] = useState<FriendsListInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const inFlight = useRef<boolean>(false);

    // apiFetch (nie useApi) – żeby wewnętrzny `loading` useApi nie re-renderował providera,
    // ale wciąż z obsługą 401 → odnowienie sesji → retry (patrz PlacesContext.load).
    const load = useCallback(async (): Promise<FriendsListInterface | null> => {
        if (inFlight.current) return null;
        inFlight.current = true;
        setLoading(true);
        try {
            const r = await apiFetch(apiPaths.getFriends, {
                method: 'GET',
                headers: {Accept: 'application/json'},
            });
            if (!r.ok) return null;
            const d = await r.json();
            return (d && Array.isArray(d.accepted)) ? (d as FriendsListInterface) : null;
        } catch {
            return null;
        } finally {
            inFlight.current = false;
            setLoading(false);
        }
    }, []);

    const ensureFriends = useCallback(() => {
        if (friends === null && !inFlight.current) {
            load().then((l) => {
                if (l) setFriends(l);
            });
        }
    }, [friends, load]);

    const refreshFriends = useCallback(async () => {
        const l = await load();
        if (l) setFriends(l);
    }, [load]);

    const value = useMemo(
        () => ({friends, loading, ensureFriends, refreshFriends}),
        [friends, loading, ensureFriends, refreshFriends],
    );

    return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};
