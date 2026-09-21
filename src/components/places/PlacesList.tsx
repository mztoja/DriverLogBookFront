import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {places} from "../../assets/txt/places";
import {PlaceInterface, UserInterface} from "types";
import {CircularProgress} from "@mui/material";
import {ActionButton} from "../common/ActionButton";
import AddIcon from "@mui/icons-material/Add";
import {form} from "../../assets/txt/form";
import DetailsIcon from '@mui/icons-material/Details';
import RoomIcon from '@mui/icons-material/Room';
import {PlaceTypeSelect} from "../common/form/place/PlaceTypeSelect";
import {CountrySelect} from "../common/form/CountrySelect";
import {SearchInput} from "../common/form/SearchInput";
import {useAlert} from "../../hooks/useAlert";
import {usePlaces} from "../../hooks/usePlaces";
import {formatCountry} from "../../utils/formats/formatCountry";
import {PlaceEdit} from "./PlaceEdit";
import {PlaceDetailCard} from "./PlaceDetailCard";

interface Props {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    showAddButton: boolean;
    setShowAddPlace: Dispatch<SetStateAction<boolean>>;
}

export const PlacesList = (props: Props) => {

    const {setAlert} = useAlert();
    const {places: data, loading, ensurePlaces} = usePlaces();

    const [showData, setShowData] = useState<PlaceInterface[] | null>(null);
    const [filterType, setFilterType] = useState<string>('999');
    const [filterCountry, setFilterCountry] = useState<string>(props.userData.country);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [chosenPlace, setChosenPlace] = useState<PlaceInterface | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        ensurePlaces();
    }, [ensurePlaces]);

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
    }, [filterType, data, filterCountry, filterSearch]);

    if (!data && loading) {
        return <CircularProgress/>
    }
    if (!data) {
        return <>{places[props.userData.lang].apiError}</>
    }

    if (data) {
        return (
            <div className="TableView">
                <main className="Table">
                    <section className="Table__Header">
                        <div className="Table__HeaderRow">
                            <span className="Table__Title">{places[props.userData.lang].tableHeader}</span>
                            <div className="Table__HeaderSearch">
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
                                                 onChange={e => setFilterSearch(e)}/>
                                </div>
                                <div className="DivInline">
                                    <ActionButton round ariaLabel="add" icon={<AddIcon/>} onClick={() => props.setShowAddPlace(true)}/>
                                </div>
                            </div>
                        </div>
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
                            {chosenPlace && <PlaceEdit
                                lang={props.userData.lang}
                                place={chosenPlace}
                                setPlace={setChosenPlace}
                                setAlert={setAlert}
                            />}
                            {showData?.map((place, index) => {
                                    index++;
                                    return (
                                        <React.Fragment key={place.id}>
                                            {expandedRow !== index && (
                                                <tr className={place.isFavorite ? 'highlighted' : ''} onClick={() => setExpandedRow(index)}>
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
                                                <>
                                                    <tr
                                                        onClick={() => setExpandedRow(null)}
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        className={isHovered || place.isFavorite ? 'highlighted' : ''}
                                                    >
                                                        <td>{index}</td>
                                                        <td>{form[props.userData.lang][`placeType${place.type}`]}</td>
                                                        <td>{formatCountry(place.country, props.userData.lang)}</td>
                                                        <td>{place.code} {place.city}</td>
                                                        <td>{place.name} - {place.street}</td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr></tr>
                                                    <tr
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        className={isHovered ? 'highlighted' : ''}
                                                    >
                                                        <td colSpan={6} className="extended">
                                                            <PlaceDetailCard
                                                                userData={props.userData}
                                                                setUserData={props.setUserData}
                                                                place={place}
                                                                onEdit={setChosenPlace}
                                                            />
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </React.Fragment>
                                    );
                                }
                            )}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        )
    }

    return <>{places[props.userData.lang].apiError}</>
};
