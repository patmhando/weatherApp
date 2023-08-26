import { useState } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';

// components
import TempResults from '@/components/TempResults';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>();

  const cnt = 4;

  const handleCity = (e: any) => {
    setCity(e.target.value);
  };

  const handleResults = async () => {
    try {
      const res = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=tz&key=67cc315733ce483e87b5240fb53abb4b`
      );

      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.log(err, 'something went really wrong!');
    }
  };

  return (
    <main
      className={`${inter.className} my-8 flex flex-col justify-center items-center gap-4`}
    >
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
          className="border px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
        >
          Search
        </button>
      </div>
      <div className="flex">
        <div>
          <p>Temperature</p>
          <p>Temp</p>
        </div>
        <div>
          <p>Weather Description</p>
          <p>Description</p>
        </div>
        <div>
          <p>Humidity</p>
          <p>Humi</p>
        </div>
        <div>
          <p>Wind Speed</p>
          <p>Speed</p>
        </div>
        <div>
          <p>Icon</p>
          <p>ico</p>
        </div>
      </div>
      <h3 className="text-xl">Daily Forecast</h3>
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
          {weatherData?.data?.map(
            (weather: any, i: number) =>
              i < 5 && <TempResults weather={weather} />
          )}
        </tbody>
      </table>
    </main>
  );
};
export default Home;
