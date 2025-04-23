import React from 'react';
import CurrencySelector from './CurrencySelecter';
import {useNavigate} from 'react-router-dom'
import AuthForm from './Authform';
import EditorButton from './EditorButton';

function Header() {
  const navigate=useNavigate();

  const gohome = () => {
    navigate('/');}



  return (
    <header className="w-screen bg-black text-white p-2">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-3xl font-bold" onClick={gohome}>Crypto Bazar</h1>
        <div className="flex items-center">
          <CurrencySelector/>
          <AuthForm/>
          <EditorButton/>
          </div>
      </div>
    </header>
  );
}

export default Header;

