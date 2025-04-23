import {React, createContext, useContext, useEffect, useState} from 'react'

const Crypto=createContext();

const CryptoContext = ({children}) => {
    const [currency,setcurrency]=useState("INR");
    const [symbol,setsymbol]=useState("₹");

    useEffect(() => {
        if(currency==="INR") setsymbol("₹");
        else if(currency==="USD") setsymbol("$");
    },[currency]);
    return (
        <Crypto.Provider value={{currency,symbol,setcurrency}}>
            {children}
        </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};

