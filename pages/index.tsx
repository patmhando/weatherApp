import { useState, useContext, createContext } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

// components
import TempResults from '@/components/TempResults';

const inter = Inter({ subsets: ['latin'] });

const ThemeContext = createContext('light');

const Home: NextPage = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('light');

  const [temp, setTemp] = useState('C');

  const handleCity = (e: any) => {
    setCity(e.target.value);
  };

  const handleResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${city}&country=tz&key=67cc315733ce483e87b5240fb53abb4b`
      );

      const res = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=tz&key=67cc315733ce483e87b5240fb53abb4b`
      );
      const dataCurrent = await response.json();
      const dataForecast = await res.json();

      setCurrent(dataCurrent);
      setForecast(dataForecast);

      setLoading(false);
    } catch (err) {
      console.log(err, 'something went really wrong!');
    }
  };

  const handleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const handleTemp = (e: any) => {
    setTemp(e?.target.value);
  };

  return (
    <ThemeContext.Provider value={mode}>
      <main
        className={`${inter.className} my-8 flex flex-col justify-center items-center gap-4`}
      >
        <button onClick={handleMode} className="focus:outline-none">
          {mode === 'light' ? (
            <SunIcon className="w-6 h-6" aria-hidden="true" />
          ) : (
            <MoonIcon className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
        <h1 className="text-center text-2xl uppercase">Weather Forecast App</h1>
        <div className="flex gap-1 mx-8">
          <label htmlFor="city" className="py-1 border px-2">
            <input
              type="text"
              placeholder="Enter City"
              name="city"
              value={city}
              onChange={handleCity}
              className="outline-none"
            />
          </label>
          <button
            type="submit"
            onClick={handleResults}
            disabled={loading}
            className=" flex gap-1 border px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 "
          >
            Search
          </button>
        </div>
        <h3 className="text-2xl font-bold capitalize">
          {city} current weather
        </h3>
        <div className="flex gap-2">
          <div>
            <p>Temperature</p>
            <p>{current?.data[0].temp}</p>
            <select name="temp" id="" onChange={handleTemp}>
              <option value="C">C</option>
              <option value="F">F</option>
            </select>
          </div>
          <div>
            <p>Weather Description</p>
            <p>{current?.data[0]?.weather?.description}</p>
          </div>
          <div>
            <p>Humidity</p>
            <p>{current?.data[0]?.rh}</p>
          </div>
          <div>
            <p>Wind Speed</p>
            <p>{current?.data[0]?.wind_spd}</p>
          </div>
          <div>
            <p>Icon</p>
            <p>{current?.data[0]?.weather?.icon}</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold capitalize">Daily Forecast</h3>
        {forecast && (
          <table className="" cellPadding={18}>
            <thead className="text-sm">
              <tr className="bg-yellow-900">
                <th>Date</th>
                <th>Icon</th>
                <th>Low Temp</th>
                <th>High Temp</th>
              </tr>
            </thead>
            <tbody>
              {forecast?.data?.map(
                (weather: any, i: number) =>
                  i > 0 &&
                  i < 6 && (
                    <TempResults key={weather?.datetime} weather={weather} />
                  )
              )}
            </tbody>
          </table>
        )}
      </main>
    </ThemeContext.Provider>
  );
};
export default Home;
