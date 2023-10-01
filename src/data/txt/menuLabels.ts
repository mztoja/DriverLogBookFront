import { MenuLabelTypes } from "../../types/MenuLabelTypes"

interface Labels {
    [key: string]: MenuLabelTypes
}

export const labels:Labels = {
    en: {
        home: "Home",
        logs: "Logs",
        days: "Days",
        finances: "Finances",
    },
    pl: {
        home: "Strona główna",
        logs: "Czynności",
        days: "Dni",
        finances: "Finanse",
    },
}

