import { FC } from 'react';

//types
import { TempForecast } from '../page';
import Image from 'next/image';

// utils
import { tempConvert } from '../utils';

interface IProps {
  weather: TempForecast;
  temp: string;
}

const TempResults: FC<IProps> = ({ weather, temp }) => {
  return (
    <div className="text-base bg-grayColor flex flex-col gap-4 items-center px-4 py-2 w-max rounded text-whiteColor">
      <Image
        src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
        alt="weather"
        width={32}
        height={32}
      />

      <div className="flex gap-4">
        <p className="flex flex-col items-center">
          <span className="text-lg">
            {tempConvert(weather?.lowTemp, temp)}&deg;{temp}
          </span>
          <span className="font-medium">Low temp</span>
        </p>
        <p className="flex flex-col items-center">
          <span className="text-lg">
            {tempConvert(weather?.highTemp, temp)}&deg;{temp}
          </span>
          <span className="font-medium">High temp</span>
        </p>
      </div>
      <p className="text-sm">{weather?.datetime}</p>
    </div>
  );
};
export default TempResults;
