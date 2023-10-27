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
  const [current, setCurrent] = useState<TempCurrent>(dataCurrent);
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
      <h1 className="text-center text-2xl font-bold uppercase">
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

      <div className="flex gap-1">
        <label htmlFor="temp">
          <span>Temperature in </span>
          <select name="temp" onChange={handleTemp}>
            <option value="C">C</option>
            <option value="F">F</option>
          </select>
        </label>
      </div>
      <div className="flex gap-2 text-center flex-wrap justify-center mb-2">
        <Card>
          <h3 className="text-2xl font-semibold capitalize">{city}</h3>
          <p>
            {tempConvert(212, temp)}&deg;{temp}
          </p>

          <p className="capitalize">{current?.weather?.[0]?.description}</p>

          <p>
            Humidity <span>{current?.main?.humidity}%</span>
          </p>

          <p>
            Wind Speed <span>{current?.wind?.speed}</span>
          </p>
          {current?.weather && (
            <Image
              src={`https://openweathermap.org/img/wn/${current?.weather?.[0]?.icon}@2x.png`}
              alt="weather"
              width={48}
              height={48}
            />
          )}
          <p></p>
        </Card>
      </div>
      <h3 className="text-2xl font-semibold capitalize">Daily Forecast</h3>
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
    // </ThemeProvider>
  );
};
export default Home;
