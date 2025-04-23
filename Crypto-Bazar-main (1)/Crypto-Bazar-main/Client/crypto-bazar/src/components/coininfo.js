import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../api/api";
import { Line } from "react-chartjs-2";
import SelectButton from "./Selectbutton";
import { chartDays } from "../api/data";
import { CryptoState } from "../CryptoContext";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CoinInfo = ({ coin }) => {
  console.log(coin);
  const [historicData, setHistoricData] = useState();
  const[loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const fetchHistoricData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setFlag(true);
      setLoading(false);
      setHistoricData(data.prices);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      // You can also set an error state here if you want to display it in the UI
      // setError(error);
    }
  };
  

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);
  

  return (
    <div className="flex flex-col items-center mt-8 p-4 w-full lg:w-2/3 mx-auto">
      {!historicData || !flag ? (
        <div className="flex justify-center items-center bg-black text-white">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-transparent border-white rounded-full" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full" style={{ maxWidth: "90vw", height: "500px" }}>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
  
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                maintainAspectRatio: false, // Allow chart to resize freely
              }}
            />
          </div>
          <div className="flex mt-8 space-x-4 overflow-x-auto w-full">
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setFlag(false);
                }}
                selected={day.value === days}
                className="bg-gray-800 text-white hover:bg-gray-700 rounded py-2 px-4"
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
