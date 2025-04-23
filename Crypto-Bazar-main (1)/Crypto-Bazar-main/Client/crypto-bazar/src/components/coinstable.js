import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CoinList } from '../api/api'; // Adjust the import according to your API file
import ReactPaginate from 'react-paginate';
import { CryptoState } from '../CryptoContext';
import {Link} from 'react-router-dom'

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const {currency} = CryptoState();
  const [currentPage, setCurrentPage] = useState(0);
  const [coinsPerPage] = useState(10); // You can adjust the number of coins per page

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Get current coins for the page
  const indexOfLastCoin = (currentPage + 1) * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-black text-white">
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-semibold text-center my-6">Cryptocurrency Prices by Market Cap</h2>
        <div className="overflow-x-auto h-full">
          <table className="min-w-full bg-black text-white rounded-lg shadow-lg overflow-hidden h-full">
            <thead className="bg-red-700">
              <tr>
                <th className="py-3 px-6 text-left">Coin</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">24h Change</th>
                <th className="py-3 px-6 text-left">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">Loading...</td>
                </tr>
              ) : (
                currentCoins.map((coin) => (
                  <tr key={coin.id} className="border-b border-gray-700 hover:bg-gray-800 transition-all duration-200">
                     <Link to={`/coins/${coin.id}`}>
                    <td className="py-3 px-6 flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3" />
                      <span className="font-medium">{coin.name}</span>
                    </td>
                    </Link>
                    <td className="py-3 px-6">${coin.current_price.toFixed(2)}</td>
                    <td className={`py-3 px-6 ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="py-3 px-6">${coin.market_cap.toLocaleString()}</td>
                  </tr>
                 
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(coins.length / coinsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex space-x-2"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded cursor-pointer"}
          activeLinkClassName={"bg-white-600"}
          previousClassName={"px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded cursor-pointer"}
          nextClassName={"px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded cursor-pointer"}
        />
      </div>
    </div>
  );
};

export default CoinTable;


