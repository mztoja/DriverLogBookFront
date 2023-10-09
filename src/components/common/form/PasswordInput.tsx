import React, {useEffect, useState} from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {form} from "../../../assets/txt/form";
import './Form.css';
import {passwordRegExp} from "../../../config/regexp";
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const PasswordInput = (props:InputPropsTypes) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        const regexp = passwordRegExp();
        if ((regexp.test(props.value)) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
                <FormControl fullWidth>
                    <InputLabel className='TextInput__Label'>{form[props.lang].password}</InputLabel>
                    <OutlinedInput
                        required
                        id="password"
                        inputProps={{className: 'TextInput'}}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={props.value}
                        onChange={props.onChange}
                        error={validation}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {form[props.lang].passwordHelper}
                </FormControl>
    );
}