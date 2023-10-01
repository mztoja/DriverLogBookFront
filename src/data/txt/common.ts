interface Common {
    title: string;
    subTitle: string;
}
interface Commons {
    [key: string]: Common
}
export const commons:Commons = {
    en: {
        title: "LogBook",
        subTitle: "Driver's Log-Book",
    },
    pl: {
        title: "D.K.",
        subTitle: "Dziennik Kierowcy",
    },
}