"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { CircleX, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, CloudSun, Cloudy, Zap } from 'lucide-react';
import moment from 'moment';
import React from 'react'

function DailyForecast() {

    const { forecast, fiveDayForecast } = useGlobalContext();

    const { weather } = forecast;
    const { city, list } = fiveDayForecast;

    if(!fiveDayForecast || !city || !list) {
        return (
            <Skeleton className='h-[12rem] w-full' />
        )
    }

    if(!forecast || !weather) {
        return (
            <Skeleton className='h-[12rem] w-full' />
        )
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    // filter the list for today's forecast
    const todayForecast = list.filter((forecast: { dt_txt: string; main: { temp: number }} ) => {
        return forecast.dt_txt.startsWith(todayString);
    })
    //console.log("daily: ", todayForecast)

    const { main: weatherMain } = weather[0];

    // get dynamic icons based on weather
    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return <CloudDrizzle className='dark:text-sky-400 text-sky-600' />;
            case "Rain": 
                return <CloudRain className='dark:text-blue-500 text-blue-600' />;
            case "Snow":
                return <CloudSnow />;
            case "Clear":
                return <CloudSun className='dark:text-yellow-400 text-yellow-500' />;
            case "Clouds":
                return <Cloudy className='dark:text-gray-300 text-gray-600' />;
            case "Thunderstorm":
                return <CloudLightning className='dark:text-orange-400 text-orange-600' />;
            default:
                return <CloudSun className='dark:text-yellow-400 text-yellow-500' />;
        }
    };


    return (
        <div className='px-4 h-[12rem] border rounded-lg flex flex-col dark:bg-[#0A0A0A] shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
            <h2 className='flex gap-2 items-center justify-center text-sm pt-3'>
                <Zap size={16} className='text-purple-500' />
                Today's Expected Weather Forecast
            </h2>
            <div className='h-full flex gap-10 items-center overflow-hidden'>
                {todayForecast.length < 1 ? (
                    <div className='flex items-center justify-center'>
                        <h1 className='text-[3rem] flex gap-2 items-center line-through text-rose-500'>
                            <CircleX />
                            No Data Available!
                        </h1>
                    </div>
                ) : (
                    <div className='w-full'>
                        <Carousel>
                            <CarouselContent>
                                {todayForecast.map((forecast: { dt_text: string; main: { temp: number }}) => {
                                    return (
                                        <CarouselItem
                                            key={forecast.dt_text}
                                            className='flex flex-col basis-[7.5rem] cursor-grab'
                                        >
                                            <div className='flex flex-col gap-3 border rounded-lg p-2 items-center justify-center'>
                                                <p className='dark:text-gray-400 text-gray-600 text-sm font-semibold'>
                                                    {moment(forecast.dt_text).format("HH:mm A")}
                                                </p>
                                                <p className='mx-2'>{getIcon()}</p>
                                                <p className='mt-4 text-sm font-medium'>
                                                    {kelvinToCelsius(forecast.main.temp)}° C
                                                </p>
                                            </div>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DailyForecast