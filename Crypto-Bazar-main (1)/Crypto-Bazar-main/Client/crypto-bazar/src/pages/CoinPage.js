import React, { useEffect, useState } from 'react';
import Coininfo from '../components/coininfo';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../api/api';
import axios from 'axios';
import parse from 'html-react-parser'

const CoinPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };

    fetchCoin();
  }, [currency]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-transparent border-white rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black min-h-screen p-4">
      <div className="flex flex-col lg:flex-row items-start w-full lg:w-4/5 mx-auto space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Coin Info Section */}
        <div className="flex flex-col lg:w-1/3 text-white">
          <div className="flex flex-col items-center lg:items-start">
            <img src={coin?.image?.large} alt={coin?.name} className="w-32 h-32 lg:w-48 lg:h-48" />
            <h2 className="text-4xl font-bold mt-4">{coin?.name}</h2>
            <p className="text-xl text-gray-400 mt-2 uppercase">{coin?.symbol}</p>
          </div>
          <p className="text-gray-400 mt-4">
            {parse(coin?.description?.en?.split(". ")[0] || "")}
          </p>
          <div className="mt-8 space-y-2">
            <p className="text-lg font-semibold">Rank: <span className="text-xl">{coin?.market_cap_rank || "N/A"}</span></p>
            <p className="text-lg font-semibold">
              Current Price: <span className="text-xl text-yellow-500">{symbol}{coin?.market_data?.current_price[currency.toLowerCase()]?.toLocaleString() || "N/A"}</span>
            </p>
            <p className="text-lg font-semibold">
              Market Cap: <span className="text-xl text-yellow-500">{symbol}{coin?.market_data?.market_cap[currency.toLowerCase()]?.toLocaleString() || "N/A"}</span>
            </p>
          </div>
        </div>
    
        {/* Chart Section */}
        <div className="lg:w-2/3 w-full">
          <Coininfo coin={coin} />
        </div>
      </div>

    </div>
  );  

};

export default CoinPage;
