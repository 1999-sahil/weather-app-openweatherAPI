"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { airQualityIndexText } from '@/app/utils/misc';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ThermometerSunIcon } from 'lucide-react';
import React from 'react'

function AirPollution() {

    const { airQuality } = useGlobalContext();

    // check if airQuality and neccessary properties are available
    if(
        !airQuality ||
        !airQuality.list ||
        !airQuality.list[0] ||
        !airQuality.list[0].main
    ) {
        return (
            <Skeleton className='h-[12rem] w-full col-span-2 md:col-span-full' />
        )
    }

    // air quality index to show in progress bar
    const airQualityIndex = airQuality.list[0].main.aqi * 10;

    // get air quality by the index
    const filteredAirQualityIndex = airQualityIndexText.find((item) => {
        return item.rating === airQualityIndex;
    });

    return (
        <div className='air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
            <h2 className='flex items-center gap-2 font-medium'>
                <ThermometerSunIcon size={16} />
                Air Pollution
            </h2>
            <Progress
                value={airQualityIndex}
                max={100}
                className="progress"
            />
            <p>Air Quality is <strong className='capitalize underline'>{filteredAirQualityIndex?.description}</strong></p>
        </div>
    )
}

export default AirPollution