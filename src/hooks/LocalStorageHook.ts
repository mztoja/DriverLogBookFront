// export const LocalStorageHook = ():number => {
//
//         // getting stored value from localstorage
//         const storedValue = localStorage.getItem("lang");
//         if (storedValue === null) {
//             const defaultLanguage = 0;//default language on first start
//             localStorage.setItem("lang", JSON.stringify(defaultLanguage));
//             return defaultLanguage;
//         } else {
//           return JSON.parse(storedValue);
//         }
// }

export const DownloadFromLocalStorage = (key:string):string | null => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {return null;}
    return JSON.parse(storedValue);
}

export const SaveToLocalStorage = (key:string, value:string):void => {
    localStorage.setItem(key, JSON.stringify(value));
}
