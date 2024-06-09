import { Plane, Rainbow } from "lucide-react";
import AirPollution from "./components/AirPollution/AirPollution";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import Humidity from "./components/Humidity/Humidity";
import Mapbox from "./components/Mapbox/Mapbox";
import Navbar from "./components/Navbar";
import Population from "./components/Population/Population";
import Pressure from "./components/Pressure/Pressure";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature";
import UvIndex from "./components/UvIndex/UvIndex";
import Visibility from "./components/Visibility/Visibility";
import Wind from "./components/Wind/Wind";
import defaultState from "./utils/defaultState";
import Footer from "./components/Footer/Footer";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import SearchDialog from "./components/SearchDialog/SearchDialog";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="mb-4 w-full flex items-center justify-between">
        <h2 className="items-center text-lg font-bold bg-gradient-to-r from-orange-500 via-purple-600 to-emerald-500 inline-block text-transparent bg-clip-text max-sm:hidden">
          Your/Weather
        </h2>
        <SearchDialog />
      </div>
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-2 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-container mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                <Plane size={16} className="text-green-500" />
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-2">
                {defaultState.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none dark:hover:border-white hover:border-black"
                      //onClick={() => {
                      //getClickedCityCords(state.lat, state.lon);
                      //}}
                    >
                      <p className="px-5 py-3">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
