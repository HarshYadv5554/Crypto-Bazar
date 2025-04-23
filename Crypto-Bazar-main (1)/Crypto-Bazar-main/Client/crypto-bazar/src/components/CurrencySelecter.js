import React from 'react'
import { CryptoState } from '../CryptoContext';

const CurrencySelecter = () => {

    const {currency,setcurrency}=CryptoState();

    console.log(currency);
  return (
      <div className="p-4 ml-2">
      <select
        className="p-2 border border-gray-300 rounded bg-black shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={currency}
      onChange={(e) => {
        setcurrency(e.target.value)
      }}
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
      </select>
    </div>
  )
}

export default CurrencySelecter
