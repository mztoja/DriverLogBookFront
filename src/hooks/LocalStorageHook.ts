export const DownloadFromLocalStorage = (key:string):string | null => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {return null;}
    return JSON.parse(storedValue);
}

export const SaveToLocalStorage = (key:string, value:string):void => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const DeleteFromLocalStorage = (key:string):void => {
    localStorage.removeItem(key);
}
