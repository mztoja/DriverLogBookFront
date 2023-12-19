import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {places} from "../../assets/txt/places";
import {PlaceInterface, UserInterface} from "types";
import {CircularProgress, Fab} from "@mui/material";
import {form} from "../../assets/txt/form";
import {countries} from "../../assets/txt/countries";
import DetailsIcon from '@mui/icons-material/Details';
import RoomIcon from '@mui/icons-material/Room';
import {PlaceTypeSelect} from "../common/form/place/PlaceTypeSelect";
import {CountrySelect} from "../common/form/CountrySelect";
import {SearchInput} from "../common/form/SearchInput";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from '../../hooks/useApi';
import {apiPaths} from "../../config/api";
import {commons} from "../../assets/txt/commons";
import {formatCountry} from "../../utils/formatCountry";
import NavigationIcon from '@mui/icons-material/Navigation';

interface Props {
    userData: UserInterface;
    refresh: boolean;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

export const PlacesList = (props: Props) => {

    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();

    const [data, setData] = useState<PlaceInterface[] | null>(null);
    const [showData, setShowData] = useState<PlaceInterface[] | null>(null);
    const [filterType, setFilterType] = useState<string>('999');
    const [filterCountry, setFilterCountry] = useState<string>(props.userData.country);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getPlaces, {
                headers: {Accept: 'application/json'},
                credentials: "include",
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setData(result.data);
            } else {
                setAlert(places[props.userData.lang].apiError, 'error');
            }
        })();
        // eslint-disable-next-line
    }, [props.refresh]);

    const markPlace = async (id: number, info: string) => {
        const result = await fetchData(apiPaths.markDepart, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify({placeId: id}),
        });
        if (result && !result.success) {
            setAlert(commons[props.userData.lang].apiConnectionError, 'error');
        } else {
            if (result && result.data) {
                if (!result.data.dtc) {
                    setAlert(places[props.userData.lang].markedPlace + ' ' + info, 'success');
                    const changedUser = props.userData;
                    changedUser.markedDepart = result.data;
                    props.setUserData(changedUser);
                } else {
                    setAlert(places[props.userData.lang].markedPlaceError, 'warning');
                }
            }
        }
    }

    useEffect(() => {
        if (data) {
            if (filterSearch.length > 1) {
                const filteredData = data.filter((place) => {
                    const searchRegex = new RegExp(filterSearch, 'i');
                    return (
                        searchRegex.test(place.name) ||
                        searchRegex.test(place.city) ||
                        searchRegex.test(place.street) ||
                        searchRegex.test(place.code) ||
                        searchRegex.test(place.description)
                    );
                });
                if (filteredData) {
                    setShowData(filteredData);
                }
            } else if (filterCountry === undefined) {
                if (Number(filterType) !== 999) {
                    const filteredData = data.filter((place) => (place.type === Number(filterType)));
                    if (filteredData) {
                        setShowData(filteredData);
                    }
                } else {
                    setShowData(data);
                }
            } else {

                if (Number(filterType) !== 999) {
                    const filteredData = data.filter((place) => (place.type === Number(filterType) && place.country === filterCountry));
                    if (filteredData) {
                        setShowData(filteredData);
                    }
                } else {
                    const filteredData = data.filter((place) => (place.country === filterCountry));
                    if (filteredData) {
                        setShowData(filteredData);
                    }
                }
            }
        }
    }, [props.refresh, filterType, data, filterCountry, filterSearch]);

    if (loading) {
        return <CircularProgress/>
    }

    if (data) {
        return (
            <>
                <main className="Table">
                    <section className="Table__Header">
                        {places[props.userData.lang].tableHeader}
                    </section>
                    <section className="Table__Filter">
                        <div className="DivInline">
                            <PlaceTypeSelect lang={props.userData.lang} value={filterType}
                                             onChange={e => setFilterType(e)} displayAll={true}/>
                        </div>
                        <div className="DivInline">
                            <CountrySelect lang={props.userData.lang} value={filterCountry}
                                           onChange={e => setFilterCountry(e)}/>
                        </div>
                        <div className="DivInline">
                            <SearchInput lang={props.userData.lang} value={filterSearch}
                                         onChange={e => setFilterSearch(e.target.value)}/>
                        </div>
                        <div className="DivClear"/>
                    </section>
                    <section className="Table__Body">
                        <table>
                            <thead>
                            <tr>
                                <th>{places[props.userData.lang].thLp}</th>
                                <th>{places[props.userData.lang].thType}</th>
                                <th>{places[props.userData.lang].thCountry}</th>
                                <th>{places[props.userData.lang].thCity}</th>
                                <th>{places[props.userData.lang].thNameStreet}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {showData?.map((place, index) => {
                                    index++;
                                    return (
                                        <React.Fragment key={place.id}>
                                            {expandedRow !== index && (
                                                <tr onClick={() => setExpandedRow(index)}>
                                                    <td>{index}</td>
                                                    <td>{form[props.userData.lang][`placeType${place.type}`]}</td>
                                                    <td>{formatCountry(place.country, props.userData.lang)}</td>
                                                    <td>{place.code} {place.city}</td>
                                                    <td>{place.name} - {place.street}</td>
                                                    <td>
                                                        {place.description !== null && <DetailsIcon/>}
                                                        {Number(place.lat) > 0.00001 && <RoomIcon/>}
                                                    </td>
                                                </tr>
                                            )}
                                            {expandedRow === index && (
                                                <tr onClick={() => setExpandedRow(null)}>
                                                    <td colSpan={6} className="extended">
                                                        <div>
                                                            {countries[props.userData.lang][place.country]}
                                                        </div>
                                                        <div>
                                                            {form[props.userData.lang][`placeType${place.type}`]}
                                                        </div>

                                                        <div>
                                                            {place.name}
                                                        </div>
                                                        <div>
                                                            {place.street}, {place.code} {place.city}
                                                        </div>
                                                        <br/>
                                                        <div>
                                                            <RoomIcon/><br/>
                                                            {place.lat}, {place.lon}
                                                        </div>
                                                        {place.description !== null && (
                                                            <div>
                                                                <DetailsIcon/><br/>
                                                                {place.description}
                                                            </div>
                                                        )}
                                                        <br/>
                                                        <div>
                                                            <Fab variant="extended" size="small" color="primary"
                                                                 onClick={() => markPlace(place.id, place.name + ' - ' + place.city)}>
                                                                <NavigationIcon sx={{mr: 1}}/>
                                                                {places[props.userData.lang].navigateSwitchLabel}
                                                            </Fab>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                }
                            )}
                            </tbody>
                        </table>
                    </section>
                </main>
            </>
        )
    }

    return <>{places[props.userData.lang].apiError}</>
};
