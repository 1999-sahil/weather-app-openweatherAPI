'use client'
import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import { AlarmClock, CalendarCheck, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, CloudSun, Cloudy, Navigation } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function Temperature() {

    const { forecast } = useGlobalContext();
    const { main, timezone, name, weather } = forecast;

    if(!forecast || !weather) {
        return (
            <Skeleton className='h-full w-full col-span-2 md:col-span-full' />
        )
    }

    const temp = kelvinToCelsius(main?.temp);
    const minTemp = kelvinToCelsius(main?.temp_min);
    const maxTemp = kelvinToCelsius(main?.temp_max);

    //state
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    const { main: weatherMain, description } = weather[0];

    // get dynamic icons based on weather
    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return <CloudDrizzle />;
            case "Rain": 
                return <CloudRain />;
            case "Snow":
                return <CloudSnow />;
            case "Clear":
                return <CloudSun />;
            case "Clouds":
                return <Cloudy />;
            case "Thunderstorm":
                return <CloudLightning />;
            default:
                return <CloudSun />;
        }
    };

    // Live time update
    useEffect(() => {
        // update time every second
        const interval = setInterval(() => {
            const localMoment = moment().utcOffset(timezone / 60);
            // custome format: 24 hour format
            const formattedTime = localMoment.format("HH:mm:ss");
            // Day of the week
            const day = localMoment.format("dddd");

            setLocalTime(formattedTime);
            setCurrentDay(day);
        }, 1000);
    }, []);

    return (
        <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-[#0A0A0A] shadow-sm dark:shadow-none'>
            <p className='flex justify-between items-center'>
                <span className='font-medium flex items-center gap-1'>
                    <CalendarCheck size={16} />
                    {currentDay}
                </span>
                <span className='font-medium flex items-center gap-1.5'>
                    <AlarmClock size={16} />
                    {localTime}
                </span>
            </p>
            <div className='w-full h-[1px] bg-gray-300 dark:bg-gray-600 my-2'></div>
            <p className='pt-2 font-bold flex gap-1'>
                <span className=''>{name}</span>
                <span><Navigation size={15} /></span>
            </p>
            <p className='py-10 text-9xl font-bold self-center'>
                {temp}°
            </p>
            <div className=''>
                <div>
                    <span>{getIcon()}</span>
                    <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
                </div>
                <p className='flex gap-2'>
                    <span className='text-sm underline underline-offset-2'>Low: <strong>{minTemp}°</strong></span>
                    <span className='text-sm underline underline-offset-2'>High: <strong>{maxTemp}°</strong></span>
                </p>
            </div>
        </div>
    )
}

export default Temperature