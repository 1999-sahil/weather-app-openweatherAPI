'use client'

import { useGlobalContext } from '@/app/context/globalContext';
import { formatPopulationNumber } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react'
import React from 'react'

function Population() {

    const { fiveDayForecast } = useGlobalContext();
    const { city } = fiveDayForecast;

    if (!fiveDayForecast || !city) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    return (
        <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-[#0A0A0A] shadow-sm dark:shadow-none">
            <div className='top'>
                <h2 className='flex items-center gap-2 font-medium'>
                    <Users size={16} />
                    Population
                </h2>
                <p className='pt-4 text-2xl'>{formatPopulationNumber(city.population)}</p>
                <div className='h-[1px] w-full dark:bg-gray-600 bg-gray-300 mt-5'></div>
            </div>
            <p className='text-xs'>Latest UN population data for {city.name}.</p>
        </div>
    )
}

export default Population