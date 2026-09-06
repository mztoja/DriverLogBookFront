import { FormEvent, useEffect, useRef, useState } from "react";
import {home} from "../../../assets/txt/home";
import { commons } from "../../../assets/txt/commons";
import {apiPaths} from "../../../config/api";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {RegistrationNrInput} from "../../common/form/vehicles/RegistrationNrInput";
import {FuelInput} from "../../common/form/FuelInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import { AddLogData, AddLoadingData, LoadInterface, loadStatusEnum, logTypeEnum, StartTourData, TourInterface } from 'types';
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import { CircularProgress, FormHelperText } from "@mui/material";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import { WindowYesNo } from "../../common/WindowYesNo";
import { formatWeight } from "../../../utils/formats/formatWeight";

type QueueStep = 'trailer' | number;

export const TourStart = (props:ActionsPropsTypes) => {

    const { loading, fetchData} = useApi();
    const { setAlert } = useAlert();

    // Kontynuacja naczepy / ładunków z poprzedniej trasy
    const [prevRoute, setPrevRoute] = useState<TourInterface | null>(null);
    const [carriedLoads, setCarriedLoads] = useState<LoadInterface[]>([]);
    const [answered, setAnswered] = useState<boolean>(false);
    const [queue, setQueue] = useState<QueueStep[]>([]);
    const [stepIdx, setStepIdx] = useState<number>(-1);
    const keepTrailerRef = useRef<boolean>(false);
    const keepLoadIdsRef = useRef<number[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetchData<TourInterface>(apiPaths.getPreviousRoute);
            const prev = res.responseData;
            if (!prev) return;
            setPrevRoute(prev);

            if (props.formData.truck.length < 1 && props.formData.fuelQuantity.length < 1) {
                props.updateFormData('fuelQuantity', prev.fuelStateAfter.toString());
                props.updateFormData('truck', prev.truck.toString());
            }

            const loadsRes = await fetchData<LoadInterface[]>(`${apiPaths.getLoadingsByTourId}/${prev.id}`);
            const carried = (loadsRes.responseData ?? []).filter((l) =>
                l.status === loadStatusEnum.unloaded &&
                l.unloadingLogData?.type === logTypeEnum.finishUnloading &&
                l.unloadingLogData?.notes === home[props.lang].finishTourUnloadNote,
            );
            setCarriedLoads(carried);
        })();
        // eslint-disable-next-line
    }, []);

    const buildQueue = (): QueueStep[] => {
        const q: QueueStep[] = [];
        if (prevRoute?.trailer) q.push('trailer');
        carriedLoads.forEach((l) => q.push(l.id));
        return q;
    };

    const createNewRoute = async (): Promise<TourInterface | null> => {
        const sendData: StartTourData = {
            action: home[props.lang].startedTourAction,
            country: props.formData.country,
            place: props.formData.place,
            truck: props.formData.truck,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            date: props.formData.date,
            fuelStateBefore: props.formData.fuelQuantity,
        }
        const res = await fetchData<TourInterface>(apiPaths.createNewRoute, { method: 'POST', sendData }, { setAlert, lang: props.lang });
        return res.success && res.responseData ? res.responseData : null;
    };

    const attachCarriedTrailer = async (): Promise<void> => {
        if (!keepTrailerRef.current || !prevRoute?.trailer) return;
        const sendData: AddLogData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: home[props.lang].trailerAttachedBySystemNote,
            action: `${home[props.lang].attachTrailerAction}: ${prevRoute.trailer}`,
        }
        await fetchData(apiPaths.attachTrailer, { method: 'POST', sendData }, { setAlert, lang: props.lang });
    };

    const addCarriedLoads = async (): Promise<void> => {
        for (const id of keepLoadIdsRef.current) {
            const orig = carriedLoads.find((l) => l.id === id);
            if (!orig) continue;
            const sendData: AddLoadingData = {
                date: props.formData.date,
                country: props.formData.country,
                place: props.formData.place,
                placeId: props.formData.placeId,
                odometer: props.formData.odometer,
                notes: home[props.lang].loadAddedBySystemNote,
                action: home[props.lang].loadingAction,
                vehicle: orig.vehicle,
                senderId: orig.senderId.toString(),
                receiverId: orig.receiverId.toString(),
                weight: orig.weight.toString(),
                quantity: orig.quantity,
                reference: orig.reference,
                description: orig.description,
            }
            // eslint-disable-next-line no-await-in-loop
            await fetchData(apiPaths.createLoad, { method: 'POST', sendData }, { setAlert, lang: props.lang });
        }
    };

    const doCreateTour = async (): Promise<void> => {
        const newTour = await createNewRoute();
        if (!newTour) return;
        setAlert(home[props.lang].startedTour, 'success');
        props.setTourData(newTour);

        try {
            await attachCarriedTrailer();
            await addCarriedLoads();
        } catch {
            setAlert(commons[props.lang].apiConnectionError, 'warning');
        }

        props.setActivityForm(null);
        props.setRefresh((prev => !prev));
        props.updateFormData('notes', '');
    };

    const sendTourStart = async (e: FormEvent) => {
        e.preventDefault();
        if (!answered) {
            const q = buildQueue();
            if (q.length > 0) {
                keepTrailerRef.current = false;
                keepLoadIdsRef.current = [];
                setQueue(q);
                setStepIdx(0);
                return;
            }
        }
        await doCreateTour();
    }

    const handleAnswer = (yes: boolean): void => {
        const step = queue[stepIdx];
        if (yes) {
            if (step === 'trailer') {
                keepTrailerRef.current = true;
            } else {
                keepLoadIdsRef.current = [...keepLoadIdsRef.current, step];
            }
        }
        const next = stepIdx + 1;
        if (next >= queue.length) {
            setStepIdx(-1);
            setAnswered(true);
            void doCreateTour();
        } else {
            setStepIdx(next);
        }
    };

    const currentStep: QueueStep | null = stepIdx >= 0 && stepIdx < queue.length ? queue[stepIdx] : null;
    const currentLoad = typeof currentStep === 'number' ? carriedLoads.find((l) => l.id === currentStep) ?? null : null;
    const questionText = currentStep === 'trailer'
        ? home[props.lang].tourStartKeepTrailerConfirm(prevRoute?.trailer ?? '')
        : currentLoad
            ? home[props.lang].tourStartKeepLoadConfirm(currentLoad.description, formatWeight(currentLoad.weight))
            : '';

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].tourStart}</legend>
            <form onSubmit={sendTourStart}>
                <div><DateTimeInput
                    lang={props.lang}
                    value={props.formData.date}
                    onChange={e => props.updateFormData('date', e)}
                />
                </div>
                <br/>
                <div><RegistrationNrInput
                    lang={props.lang}
                    value={props.formData.truck}
                    onChange={e => props.updateFormData('truck', e)}
                    vehicle='truck'
                />
                </div>
                <br/>
                <div><FuelInput
                    lang={props.lang}
                    value={props.formData.fuelQuantity}
                    onChange={e => props.updateFormData('fuelQuantity', e)}
                    type='quantity'
                    userFuelConType={props.userData.fuelConType}
                />
                </div>
                <br/>
                <div><OdometerInput
                    lang={props.lang}
                    value={props.formData.odometer}
                    onChange={e => props.updateFormData('odometer', e)}
                />
                </div>
                <br/>
                <div><PlaceInput
                    lang={props.lang}
                    defaultCountry={props.userData.country}
                    countryValue={props.formData.country}
                    countryOnChange={e => props.updateFormData('country', e)}
                    placeValue={props.formData.place}
                    placeOnChange={e => props.updateFormData('place', e)}
                    placeIdValue={props.formData.placeId}
                    placeIdOnChange={e => props.updateFormData('placeId', e)}
                />
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].tourStart}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
            <WindowYesNo
                lang={props.lang}
                show={currentStep !== null}
                text={questionText}
                onYes={() => handleAnswer(true)}
                onNo={() => handleAnswer(false)}
            />
        </fieldset>
    );
}
