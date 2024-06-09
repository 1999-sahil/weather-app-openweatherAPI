import moment from "moment";

export const kelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
};

export const airQualityIndexText = [
    {
        rating: 10,
        description: "good",
    },
    {
        rating: 20,
        description: "fair",
    },
    {
        rating: 30,
        description: "moderate",
    },
    {
        rating: 40,
        description: "poor",
    },
    {
        rating: 500,
        description: "very poor",
    },
];

export const unixToTime = (unix: number, timezone: number) => {
    return moment.unix(unix).utcOffset(timezone / 60).format("HH:mm A");
};

export const formatPopulationNumber = (num: number) => {
    if(num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    } else if(num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    } else {
        return num;
    }
};

export const unixToDay = (unix: number) => {
    return moment.unix(unix).format("ddd");
};