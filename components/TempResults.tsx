import { FC } from 'react';
const TempResults: FC = () => {
  return (
    <tr className="text-sm odd:bg-gray-300 even:bg-gray-400">
      <td>Day</td>
      <td>Temperature</td>
      <td>Weather Description</td>
      <td>Wind Speed</td>
      <td>Icon</td>
    </tr>
  );
};
export default TempResults;
