import { useState } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';

// components
import TempResults from '@/components/TempResults';

const inter = Inter({ subsets: ['latin'] });

const Home: NextPage = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleResults = () => {
    setSearch('');
  };

  return (
    <main
      className={`${inter.className} my-8 flex flex-col justify-center items-center gap-4`}
    >
      <h1 className="text-center text-2xl uppercase">Weather Forecast App</h1>
      <div className="flex gap-1 mx-8">
        <label htmlFor="search" className="py-1 border px-2">
          <input
            type="text"
            placeholder="Enter City"
            name="search"
            value={search}
            onChange={handleSearch}
            className="outline-none"
          />
        </label>
        <button
          onClick={handleResults}
          className="border px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
        >
          Search
        </button>
      </div>
      <h3 className="text-xl">Weather Results</h3>
      <table className="">
        <thead className="text-sm">
          <tr>
            <th>Day</th>
            <th>Temperature</th>
            <th>Weather Description</th>
            <th>Wind Speed</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          <TempResults />
        </tbody>
      </table>
    </main>
  );
};
export default Home;
