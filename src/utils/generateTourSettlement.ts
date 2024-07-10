import {TourSettleGeneratorInterface, userLangEnum} from "types";
import {PDFDocument} from "pdf-lib";
import {saveAs} from 'file-saver';
import {tours} from "../assets/txt/tours";
import {SetAlertType} from "../context/AlertContext";

export const generateTourSettlement = async (
    id: number,
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
            if (field) {
                field.setText(value);
            }
        });
        const title = tours[lang].generateTitle(data.routeNr);
        pdfDoc.setTitle(title);
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        saveAs(blob, `${title}.pdf`);
    } catch (e) {
        setAlert(tours[lang].generatorNotFound, 'info');
    }
}