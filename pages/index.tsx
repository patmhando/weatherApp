import { useState } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

// components
import TempResults from '@/components/TempResults';
import Card from '@/components/Card';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState<any>();
  const [current, setCurrent] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [temp, setTemp] = useState('C');
  const [currentCity, setCurrentCity] = useState('');

  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCity = (e: any) => {
    setCity(e.target.value);
  };

  const handleResults = async () => {
    setLoading(true);

    setCurrent(null);
    setForecast(null);
    setCurrentCity('');
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
      setCurrentCity(city);

      setLoading(false);
    } catch (err: any) {
      setErrors('');

      console.log(err);
      setErrors(err.message);
    }
  };

  const handleTemp = (e: any) => {
    setTemp(e?.target.value);
  };

  return (
    <main
      className={`${inter.className} my-8  flex flex-col justify-center items-center gap-2`}
    >
      <button onClick={handleTheme} className="focus:outline-none">
        {theme === 'light' ? (
          <SunIcon className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MoonIcon className="w-6 h-6" aria-hidden="true" />
        )}
      </button>
      <h1 className="text-center text-2xl font-bold uppercase">
        Weather Forecast App
      </h1>
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

      <h3 className="text-2xl font-semibold capitalize">
        {currentCity} current weather
      </h3>
      <div className="flex gap-1">
        <p className="text-lg font-semibold">Temeperature in C</p>
        {/* <select name="temp" onChange={handleTemp}>
            <option value="C">C</option>
            <option value="F">F</option>
          </select> */}
      </div>
      <div className="flex gap-2 text-center flex-wrap justify-center mb-2">
        <Card>
          <p className="">Temperature</p>
          <p>{current?.data[0].temp}</p>
        </Card>
        <Card>
          <p>Weather Description</p>
          <p>{current?.data[0]?.weather?.description}</p>
        </Card>
        <Card>
          <p>Humidity</p>
          <p>{current?.data[0]?.rh}</p>
        </Card>
        <Card>
          <p>Wind Speed</p>
          <p>{current?.data[0]?.wind_spd}</p>
        </Card>
        <Card>
          <p>Icon</p>
          <p>{current?.data[0]?.weather?.icon}</p>
        </Card>
      </div>
      <h3 className="text-2xl font-semibold capitalize">Daily Forecast</h3>
      {forecast && (
        <table className="" cellPadding={20}>
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
      <p className="bg-red-700 rounded py-1 px-4 text-base sm:text-lg text-white">
        <span className="">Note: </span>
        <span>The App only works for Tanzania regions</span>
      </p>
      {errors && (
        <div className="bg-red-700 rounded py-1 px-4 text-white">{errors}</div>
      )}
      <p>
        SOurce code are available here{' '}
        <a
          href="https://github.com/patmhando/weatherApp"
          className="text-blue-600"
        >
          Link
        </a>
      </p>
    </main>
  );
};
export default Home;
