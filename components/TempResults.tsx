import { FC } from 'react';

interface IProps {
  weather: any;
}
const TempResults: FC<IProps> = ({ weather }) => {
  return (
    <tr className="text-sm odd:bg-gray-300 even:bg-gray-400">
      <td>{weather?.datetime}</td>
      <td>{weather?.weather?.icon}</td>
      <td>{weather?.low_temp}</td>
      <td>{weather?.high_temp}</td>
    </tr>
  );
};
export default TempResults;
