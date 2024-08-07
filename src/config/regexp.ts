// Regular expressions file:

//E-mail:
export const emailRegExp = () => {
    return new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

//Password:
export const passwordRegExp = () => {
    return new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
};

//Amount:
export const amountRegExp = () => {
    return new RegExp(/^\d+(\.\d{1,2})?$/);
};