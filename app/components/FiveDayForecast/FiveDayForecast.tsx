'use client'

import { useGlobalContext } from '@/app/context/globalContext';
import { kelvinToCelsius, unixToDay } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarCheck } from 'lucide-react';
import React from 'react'

function FiveDayForecast() {
    const { fiveDayForecast } = useGlobalContext();

  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);
    dailyForecasts.push(processData(dailyData));
  }

  return (
    <div className='pt-6 pb-5 px-4 flex-1 rounded-lg flex flex-col justify-between border dark:bg-[#0A0A0A] shadow-sm dark:shadow-none'>
        <div className="top">
            <h2 className="flex items-center gap-2 font-medium">
                <CalendarCheck size={17} /> 5-Day Forecast for {city.name}
            </h2>

            <div className="forecast-list pt-3">
          {dailyForecasts.map((day, i) => {
            return (
              <div
                key={i}
                className="daily-forecast py-4 flex flex-col justify-evenly border-b-2"
              >
                <div className='border rounded-lg p-2 dark:hover:border-white hover:border-[#0A0A0A]'>
                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                <p className="text-sm flex justify-between">
                  <span>(low)</span>
                  <span>(high)</span>
                </p>

                <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="font-bold">{day.minTemp}° C</p>
                  <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                  <p className="font-bold">{day.maxTemp}° C</p>
                </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
    </div>
  )
}

export default FiveDayForecast