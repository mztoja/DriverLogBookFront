import {createTheme} from "@mui/material/styles";

// Motyw wprowadzony przy przebudowie layoutu.
// Celowo minimalny: zostaje domyślna (jasna) kolorystyka MUI – czytelne przyciski,
// białe tło list/dialogów. Kolory layoutu (ciemne panele) są w dedykowanym CSS-ie.
// Nadpisujemy tylko czytelność przycisków "outlined", bo stoją na ciemnym panelu treści.
export const theme = createTheme({
    breakpoints: {
        values: {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536},
    },
    components: {
        MuiButton: {
            styleOverrides: {
                outlined: {
                    color: "#dbe1ff",
                    borderColor: "#5c6bc0",
                    "&:hover": {
                        borderColor: "#7986cb",
                        backgroundColor: "rgba(121, 134, 203, 0.16)",
                    },
                },
            },
        },
    },
});
