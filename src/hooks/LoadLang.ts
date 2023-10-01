export const LoadLang = ():string => {

        // getting stored value from localstorage
        const storedValue = localStorage.getItem("lang");
        if (storedValue === null) {
            const defaultLanguage = 'en';//default language on first start
            localStorage.setItem("lang", JSON.stringify(defaultLanguage));
            return defaultLanguage;
        } else {
          return JSON.parse(storedValue);
        }
}
