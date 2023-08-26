import { useState } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';

// components
import TempResults from '@/components/TempResults';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState();

  const cnt = 4;

  const handleCity = (e: any) => {
    setCity(e.target.value);
  };

  const handleResults = async () => {
    try {
      const res = await fetch(
        `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&appid=${process.env.API_KEY}`
      );

      const data = await res.json();
      setWeatherData(data);
      console.log(data);
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
      <h3 className="text-xl">Weather Results</h3>
      <table className="" cellPadding={18}>
        <thead className="text-sm">
          <tr className="bg-yellow-900">
            <th>Day</th>
            <th>Temperature</th>
            <th>Weather Description</th>
            <th>Wind Speed</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {/* {weatherData?.map(weather=>)} */}
          <TempResults />
          <TempResults />
          <TempResults />
        </tbody>
      </table>
    </main>
  );
};
export default Home;
