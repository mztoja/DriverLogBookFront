import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {CircularProgress, MenuItem, Select} from "@mui/material";
import {form} from "../../../../assets/txt/form";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {apiPaths} from "../../../../config/api";
import {places as placesTxt} from "../../../../assets/txt/places";
import {useApi} from "../../../../hooks/useApi";
import {useAlert} from "../../../../hooks/useAlert";
import {PlaceInterface} from "types";

interface Props extends InputPropsTypes {
    fullWidth?: boolean;
}


export const CompanySelect = (props: Props) => {

    const [value, setValue] = useState<number>(Number(props.value));
    const [placesList, setPlacesList] = useState<PlaceInterface[]>([]);
    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getCompanyList, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setPlacesList(result.responseData);
            } else {
                setAlert(placesTxt[props.lang].apiError, 'error');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        props.onChange(value.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <FormControl fullWidth={props.fullWidth}>
            <InputLabel id="companyData" className="TextInput__Label">{form[props.lang].placeType1}</InputLabel>
            {placesList.length > 0 && !loading &&
                <Select
                label={form[props.lang].placeType1}
                id="companyData"
                value={value}
                onChange={(e) => {
                    setValue(Number(e.target.value));
                }}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                {placesList.map(company => (
                    <MenuItem key={company.id} value={company.id}>
                        ({company.country}) {company.name} - {company.street}, {company.code} {company.city}
                    </MenuItem>))}
                </Select>
            }
        </FormControl>);
}