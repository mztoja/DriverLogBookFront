import React, {useEffect, useState} from "react";
import {places} from "../../assets/txt/places";
import {PlaceInterface, UserInterface, MarkDepartInterface} from "types";
import {CircularProgress} from "@mui/material";
import {form} from "../../assets/txt/form";
import {countries} from "../../assets/txt/countries";
import DetailsIcon from '@mui/icons-material/Details';
import RoomIcon from '@mui/icons-material/Room';
import {PlaceTypeSelect} from "../common/form/place/PlaceTypeSelect";
import {CountrySelect} from "../common/form/CountrySelect";
import {Link} from "react-router-dom";
import {SearchInput} from "../common/form/SearchInput";
import {useApiGetData} from "../../hooks/useApiGetData";
import {useAlert} from "../../hooks/useAlert";
import {apiURL} from "../../config/api";

interface Props {
    userData: UserInterface;
}

export const PlacesList = (props: Props) => {

    const {setAlert} = useAlert();

    const [showData, setShowData] = useState<PlaceInterface[] | null>(null);
    const [filterType, setFilterType] = useState<string>('4');
    const [filterCountry, setFilterCountry] = useState<string>(props.userData.country);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const {data, loading, error} = useApiGetData<PlaceInterface[]>('/places', true);

    const markPlace = async (id: number, info: string) => {
        const sendData: MarkDepartInterface = {
            userId: props.userData.id,
            placeId: id.toString(),
        }
        await fetch(apiURL + '/users/markDepart', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendData),
        }).then(res => {
            if (res.ok) {
                setAlert(places[props.userData.lang].markedPlace + ' ' + info, 'success');
            }
        }).catch(() => {
            setAlert(places[props.userData.lang].markedPlaceError, 'warning');
        });
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
                const filteredData = data.filter((place) => (place.type === Number(filterType)));
                if (filteredData) {
                    setShowData(filteredData);
                }
            } else {
                const filteredData = data.filter((place) => (place.type === Number(filterType) && place.country === filterCountry));
                if (filteredData) {
                    setShowData(filteredData);
                }
            }
        }
    }, [filterType, data, filterCountry, filterSearch]);

    if (loading) {
        return <CircularProgress/>
    }

    if (error) {
        setAlert(places[props.userData.lang].apiError, 'error');
    }

    return (
        <>
            <main className="Table">
                <section className="Table__Header">
                    {places[props.userData.lang].tableHeader}
                </section>
                <section className="Table__Filter">
                    <div className="DivInline">
                        <PlaceTypeSelect lang={props.userData.lang} value={filterType}
                                         onChange={e => setFilterType(e)}/>
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
                                                <td>{countries[props.userData.lang][place.country]}</td>
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
                                                <td colSpan={6}>
                                                    <center>
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
                                                        <div>
                                                            <DetailsIcon/><br/>
                                                            {place.description}
                                                        </div>
                                                        <div>
                                                            <Link to="" className="ContentLink"
                                                                  onClick={() => markPlace(place.id, place.name + ' - ' + place.city)}>{places[props.userData.lang].navigateSwitchLabel}</Link>
                                                        </div>
                                                    </center>
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
};
