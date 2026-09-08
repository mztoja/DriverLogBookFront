import {TourSettleGeneratorInterface, TourSettleGeneratorLeg, userLangEnum} from "types";
import { PDFDocument } from "pdf-lib";
import {saveAs} from 'file-saver';
import {tours} from "../assets/txt/tours";
import {SetAlertType} from "../context/AlertContext";
import { REACT_APP_URL } from "../config/set";

const diacriticsMap: { [key: string]: string } = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
};
function replaceDiacritics(str: string): string {
    return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, match => diacriticsMap[match]);
}

// Pola odcinków w szablonie PDF: startCity1..startCity20 itd.
const LEG_FIELDS: (keyof TourSettleGeneratorLeg)[] = [
    'startCity', 'startData', 'startOdometer', 'borderDate', 'borderPlace',
    'stopCity', 'stopData', 'stopOdometer', 'distance', 'customer',
];
const MAX_LEG_ROWS = 20;

export const generateTourSettlement = async (
    lang: userLangEnum,
    data: TourSettleGeneratorInterface,
    tourGenerator: string,
    setAlert: (text: string, type: SetAlertType) => void
) => {
    try {
        const existingPdfBytes = await fetch(`${REACT_APP_URL}/tourSettlementTemplates/${tourGenerator}.pdf`).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();
        Object.keys(data).forEach((fieldName) => {
            if (fieldName === 'routes') return; // odcinki spłaszczamy poniżej
            // @ts-ignore
            const value = data[fieldName];
            try {
                const field = form.getTextField(fieldName);
                const sanitizedValue = replaceDiacritics(value);
                field.setText(sanitizedValue);
            } catch {
            }
        });
        // Spłaszczenie dynamicznej tablicy odcinków na nazwane pola formularza PDF (startCity1, customer1, ...).
        // Wypełniamy WSZYSTKIE sloty 1..20 – niewykorzystane czyścimy pustym stringiem, żeby w PDF nie
        // zostały domyślne/przykładowe wartości z szablonu.
        for (let n = 1; n <= MAX_LEG_ROWS; n++) {
            const leg = data.routes[n - 1];
            LEG_FIELDS.forEach((f) => {
                try {
                    form.getTextField(`${f}${n}`).setText(replaceDiacritics(leg ? (leg[f] ?? '') : ''));
                } catch {
                }
            });
        }
        const title = tours[lang].generateTitle(data.routeNr);
        pdfDoc.setTitle(title);
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as BlobPart], {type: 'application/pdf'});
        saveAs(blob, `${title}.pdf`);
    } catch (e) {
        console.log(e);
        setAlert(tours[lang].generatorNotFound, 'info');
    }
}