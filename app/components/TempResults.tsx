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
    <tr className="text-sm odd:bg-gray-400 even:bg-gray-500">
      <td>{weather?.datetime}</td>
      <td>
        <Image
          src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
          alt="weather"
          width={32}
          height={32}
        />
      </td>
      <td>
        {tempConvert(weather?.lowTemp, temp)}&deg;{temp}
      </td>
      <td>
        {tempConvert(weather?.highTemp, temp)}&deg;{temp}
      </td>
    </tr>
  );
};
export default TempResults;
