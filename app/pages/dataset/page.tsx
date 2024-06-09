'use client'
import React, { useState, useEffect } from 'react'
import ThemeDropdown from '../../components/ThemeDropdown/ThemeDropdown'
import { Button } from '@/components/ui/button'
import { Github, Loader } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios';
import { useRouter } from 'next/navigation';


function Dataset() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const api = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/exports/json?lang=en&timezone=Asia%2FKolkata"
  const apiFor20 = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        console.log("API RESPONSE DATA: ", response.data);
        console.log("Single Data: ", response.data[0]);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  {/**
if (loading) {
    return <div className='flex gap-2 w-full h-screen items-center justify-center'>
      <Loader />
      Please wait your data is loading...
    </div>
  } */}

  if (error) {
    return <div className='text-red-500'>Error: {error}</div>; // Render error message
  }

  console.log("DATA LENGTH:", data.length); // Log data length

  return (
    <div className='mx-[3rem]'>
      {/** top section */}
      <div className="flex items-center justify-between border-b py-[1rem] mb-[2rem]">
        <div className="left">
          <h2 className="text-lg font-bold bg-gradient-to-r from-orange-500 via-purple-600 to-emerald-500 inline-block text-transparent bg-clip-text">
            Your/Weather
          </h2>
        </div>
        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
          <Button
            className="source-code flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com");
            }}
          >
            <Github size={15} />
            Source Code
          </Button>
        </div>
      </div>

      {/** table section */}
      {data && data.length > 0 && (
        <div className='py-6'>
        <Table>
          <TableCaption className=''>Total City Counts: {data && data?.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Geoname ID</TableHead>
              <TableHead>City Name</TableHead>
              <TableHead>Country Name</TableHead>
              <TableHead>Population</TableHead>
              <TableHead>Country Code</TableHead>
              <TableHead>Timezone</TableHead>
              <TableHead>Coordinates</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

      </div>
      )}
    </div>
  )
}

export default Dataset

{/** <TableCell>{item.name}</TableCell>
                  <TableCell>{item.cou_name_en}</TableCell>
                  <TableCell>{item.population}</TableCell>
                  <TableCell>{item.country_code}</TableCell>
                  <TableCell>{item.timezone}</TableCell>
                  <TableCell>{item.coordinates ? `${item.coordinates.lat}, ${item.coordinates.lon}` : '-'}</TableCell> */}

{/**
{data && data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.geoname_id}</TableCell>
              </TableRow>
            ))} */}