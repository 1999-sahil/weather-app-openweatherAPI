"use client";

import { useGlobalContext } from '@/app/context/globalContext';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import { Sunrise, SunsetIcon } from 'lucide-react';
import React from 'react'

function Sunset() {

    const { forecast } = useGlobalContext();

    if(!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return (
            <Skeleton className='h-[12rem] w-full' />
        )
    }

    const sunset= forecast?.sys?.sunset;
    const sunrise = forecast?.sys?.sunrise;
    const timezone = forecast?.timezone;

    const sunsetTime = unixToTime(sunset, timezone);
    const sunriseTime = unixToTime(sunrise, timezone);
    
    return (
        <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    <SunsetIcon size={16} />
                    Sunset
                </h2>
                <p className='pt-4 text-2xl'>{sunsetTime}</p>
            </div>
            <p className='flex items-center text-sm gap-1'>
                <Sunrise size={16} />
                Sunrise: <strong>{sunriseTime}</strong>
            </p>
        </div>
    )
}

export default Sunset