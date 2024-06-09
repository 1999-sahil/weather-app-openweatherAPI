"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import defaultState from "../utils/defaultState";
import { debounce } from "lodash";

const GlobalContext = React.createContext();
const GlobalContextUpdate = React.createContext();

export const GlobalContextProvider = ({ children }) => {

    //const [state, setState] = useState("hello");
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const [uvIndex, setUvIndex] = useState({});
    const [geoCodedList, setGeoCodedList] = useState(defaultState);
    const [inputValue, setInputValue] = useState("");
    const [activeCityCoords, setActiveCityCoords] = useState([28.6139, 77.2090]);

    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
            setForecast(res.data);
            //console.log("forecast: ", res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
            setAirQuality(res.data);
            //console.log("air quality: ", res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveDayForecast?lat=${lat}&lon=${lon}`);
            setFiveDayForecast(res.data);
            //console.log("five day forecast: ", res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);
            setUvIndex(res.data);
            //console.log("UV Index: ", res.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    const fetchGeoCodedList = async (search) => {
        console.log("search: ", search)
        try {
            const res = await axios.get(`/api/geoCoded?search=${search}`);
            setGeoCodedList(res.data);
            //console.log("geocoded list: ", res.data);
        } catch (error) {
            console.log("Error Fetching geocoded list: ", error.message);            
        }
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);

        if(e.target.value === "") {
            setGeoCodedList(defaultState);
        }
    };

    // debounce feature
    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            fetchGeoCodedList(search);
        }, 500);

        if (inputValue) {
            debouncedFetch(inputValue);
        }

        // cleanup
        return () => debouncedFetch.cancel();

    }, [inputValue]);

    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords])

    return (
        <GlobalContext.Provider 
            value={{ 
                forecast,
                airQuality,
                fiveDayForecast,
                uvIndex,
                geoCodedList,
                inputValue,
                handleInput,
                setActiveCityCoords,
            }}
        >
            <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);