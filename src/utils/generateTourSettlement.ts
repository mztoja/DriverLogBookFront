import {TourSettleGeneratorInterface, userLangEnum} from "types";
import { PDFDocument } from "pdf-lib";
import {saveAs} from 'file-saver';
import {tours} from "../assets/txt/tours";
import {SetAlertType} from "../context/AlertContext";

const diacriticsMap: { [key: string]: string } = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
};
function replaceDiacritics(str: string): string {
    return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, match => diacriticsMap[match]);
}

export const generateTourSettlement = async (
    lang: userLangEnum,
    data: TourSettleGeneratorInterface,
    tourGenerator: string,
    setAlert: (text: string, type: SetAlertType) => void
) => {
    try {
        const existingPdfBytes = await fetch(`/tourSettlementTemplates/${tourGenerator}.pdf`).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();
        Object.keys(data).forEach((fieldName) => {
            // @ts-ignore
            const value = data[fieldName];
            const field = form.getTextField(fieldName);
            const sanitizedValue = replaceDiacritics(value);
            field.setText(sanitizedValue);
        });
        const title = tours[lang].generateTitle(data.routeNr);
        pdfDoc.setTitle(title);
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        saveAs(blob, `${title}.pdf`);
    } catch (e) {
        console.log(e);
        setAlert(tours[lang].generatorNotFound, 'info');
    }
}