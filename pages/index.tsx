import { useState } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

// config
import { API_KEY } from '@/config';

// components
import TempResults from '@/components/TempResults';
import Card from '@/components/Card';

const inter = Inter({ subsets: ['latin'] });

interface TempCurrent {
  weather: [{ description: string; icon: string }];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const Home: NextPage = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState<any>();
  const [current, setCurrent] = useState<TempCurrent>();
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

    setForecast(null);
    setCurrentCity('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const dataCurrent: TempCurrent = await response.json();

      setCurrent(dataCurrent);

      setCurrentCity(city);

      setLoading(false);
    } catch (err: any) {
      setErrors('');

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
          {loading ? 'Loading...' : 'Search'}
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
          <p>{current?.main?.temp}</p>
        </Card>
        <Card>
          <p>Weather Description</p>
          <p>{current?.weather?.[0]?.description}</p>
        </Card>
        <Card>
          <p>Humidity</p>
          <p>{current?.main?.humidity}</p>
        </Card>
        <Card>
          <p>Wind Speed</p>
          <p>{current?.wind?.speed}</p>
        </Card>
        <Card>
          <p>Icon</p>
          <p>{current?.weather?.[0]?.icon}</p>
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
            {forecast?.data?.map((weather: any) => (
              <TempResults key={weather?.datetime} weather={weather} />
            ))}
          </tbody>
        </table>
      )}

      {errors && (
        <div className="bg-red-700 rounded py-1 px-4 text-white">{errors}</div>
      )}
      <p>
        Source code are available
        <a
          href="https://github.com/patmhando/weatherApp"
          className="text-blue-600 ml-1"
        >
          here
        </a>
      </p>
    </main>
  );
};
export default Home;
