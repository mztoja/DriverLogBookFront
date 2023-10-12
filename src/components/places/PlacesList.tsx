import React, {useEffect, useState} from "react";
import {places} from "../../assets/txt/places";
import {PlaceInterface, UserLangEnum} from "types";
import {apiURL} from "../../config/api";
import {CircularProgress} from "@mui/material";
import {form} from "../../assets/txt/form";
import {countries} from "../../assets/txt/countries";
import DetailsIcon from '@mui/icons-material/Details';
import RoomIcon from '@mui/icons-material/Room';

interface Props {
    lang: UserLangEnum;
    userId: string;
}

export const PlacesList = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<PlaceInterface[] | null>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetch(apiURL + '/places', {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            }).then(async res => {
                if (!res.ok) {
                    throw new Error('Places list can not be downloaded');
                } else {
                    const data = await res.json();
                    setData(data);
                }
            }).finally(() => {
                setLoading(false);
            });
        })();
    }, []);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <main className="Table">
            <section className="Table__Header">
                <h3>{places[props.lang].tableHeader}</h3>
            </section>
            <section className="Table__Body">
                <table>
                    <thead>
                    <tr>
                        <th>{places[props.lang].thLp}</th>
                        <th>{places[props.lang].thType}</th>
                        <th>{places[props.lang].thCountry}</th>
                        <th>{places[props.lang].thCity}</th>
                        <th>{places[props.lang].thNameStreet}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((place, index) => {
                            index++;
                            return (
                                <React.Fragment key={place.id}>
                                    {expandedRow !== index && (
                                        <tr onClick={() => setExpandedRow(index)}>
                                            <td>{index}</td>
                                            <td>{form[props.lang][`placeType${place.type}`]}</td>
                                            <td>{countries[props.lang][place.country]}</td>
                                            <td>{place.code} {place.city}</td>
                                            <td>{place.name} - {place.street}</td>
                                            <td>
                                                {place.description.length > 1 && <DetailsIcon/>}
                                                {Number(place.lat) > 0.00001 && <RoomIcon/>}
                                            </td>
                                        </tr>
                                    )}
                                    {expandedRow === index && (
                                        <tr onClick={() => setExpandedRow(null)}>
                                            <td colSpan={6}>
                                                <center>
                                                    <div>
                                                        {countries[props.lang][place.country]}
                                                    </div>
                                                    <div>
                                                        {form[props.lang][`placeType${place.type}`]}
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
                                                </center>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                                ;
                        }
                    )}
                    </tbody>
                </table>
            </section>
        </main>
    )
};
