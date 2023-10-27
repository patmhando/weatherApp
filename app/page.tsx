'use client';
import { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { ThemeProvider } from 'next-themes';

// components
import TempResults from '@/app/components/TempResults';
import Card from '@/app/components/Card';

// utils
import { tempConvert } from '@/app/utils';

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

export interface TempForecast {
  datetime: string;
  icon: string;
  lowTemp: number;
  highTemp: number;
}

const dataCurrent: TempCurrent = {
  weather: [{ description: 'Clear Sky', icon: '04d' }],
  main: {
    temp: 212,
    pressure: 80,
    humidity: 50,
  },
  wind: {
    speed: 1.5,
  },
};

const dataForecast: TempForecast[] = [
  {
    datetime: '12/08/2022',
    icon: '03d',
    lowTemp: 44,
    highTemp: 55,
  },
  {
    datetime: '12/09/2022',
    icon: '02d',
    lowTemp: 44,
    highTemp: 55,
  },
  {
    datetime: '19/08/2022',
    icon: '01d',
    lowTemp: 14,
    highTemp: 25,
  },
  {
    datetime: '16/08/2022',
    icon: '02d',
    lowTemp: 44,
    highTemp: 55,
  },
  {
    datetime: '13/08/2022',
    icon: '04d',
    lowTemp: 4,
    highTemp: 35,
  },
];

const Home: NextPage = () => {
  const [city, setCity] = useState('');
  const [current, setCurrent] = useState(dataCurrent);
  const [forecast, setForecast] = useState(dataForecast);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [temp, setTemp] = useState('C');

  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCity = (e: any) => {
    setCity(e.target.value);
  };

  const handleResults = async () => {
    setLoading(true);

    // setForecast(null);
    // try {
    //   const response = await fetch(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    //   );

    //   const dataCurrent: TempCurrent = await response.json();

    //   setCurrent(dataCurrent);

    //   setLoading(false);
    // } catch (err: any) {
    //   setErrors('');

    //   setErrors(err.message);
    // }
  };
  // #c3c3c3

  const handleTemp = (e: any) => {
    setTemp(e?.target.value);
  };

  return (
    // <ThemeProvider attribute="class">
    <main className="my-8 flex flex-col justify-center items-center gap-2">
      <button onClick={handleTheme} className="focus:outline-none">
        {theme === 'dark' ? (
          <SunIcon className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MoonIcon className="w-6 h-6" aria-hidden="true" />
        )}
      </button>
      <h1 className="text-center text-4xl font-bold uppercase">
        Weather Forecast App
      </h1>
      <div className="relative">
        <label htmlFor="city">
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={city}
            onChange={handleCity}
            className="py-2 px-6 border rounded-xl"
          />
        </label>
        <button
          type="submit"
          onClick={handleResults}
          disabled={loading}
          className="absolute m-1 right-0 py-1 rounded-xl px-4 bg-primaryColor"
        >
          Search
        </button>
      </div>

      <label htmlFor="temp" className="text-xl font-semibold mt-6 uppercase">
        <span>{city}</span>
        <span>Current temperature in </span>
        <select name="temp" onChange={handleTemp}>
          <option value="C">C</option>
          <option value="F">F</option>
        </select>
      </label>

      <div className="flex gap-2 text-center flex-col items-center mb-2">
        {current?.weather && (
          <Image
            src={`https://openweathermap.org/img/wn/${current?.weather?.[0]?.icon}@2x.png`}
            alt="weather"
            width={64}
            height={64}
          />
        )}
        <div className="flex flex-col gap-2">
          <p>
            <span>Today's temperature is </span>
            <span className="text-primaryColor font-bold">
              {tempConvert(212, temp)}&deg;{temp}
            </span>

            <span> with </span>
            <span className="capitalize">
              {current?.weather?.[0]?.description}
            </span>
          </p>

          <p>
            Humidity level is{' '}
            <span className="text-primaryColor font-semibold">
              {current?.main?.humidity}%{' '}
            </span>
            and Wind Speed is{' '}
            <span className="text-primaryColor font-semibold">
              {current?.wind?.speed}
            </span>
          </p>
        </div>
      </div>
      <h3 className="text-xl font-semibold uppercase">Daily Forecast</h3>
      {forecast && (
        <div className="flex gap-2">
          {forecast?.map((weather) => (
            <TempResults
              key={weather?.datetime}
              weather={weather}
              temp={temp}
            />
          ))}
        </div>
      )}

      {errors && (
        <div className="bg-red-700 rounded py-1 px-4 text-white">{errors}</div>
      )}
      <p className="mt-8">
        Source code are available
        <a
          href="https://github.com/patmhando/weatherApp"
          className="text-blue-600 ml-1"
        >
          here
        </a>
      </p>
    </main>
    // </ThemeProvider>
  );
};
export default Home;
