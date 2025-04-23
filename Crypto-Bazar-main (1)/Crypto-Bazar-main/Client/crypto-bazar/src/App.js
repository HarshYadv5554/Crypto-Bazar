import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import homepage from './pages/homepage';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';
import Editor from './pages/Editor';

function App() {
  return (
    <div className="w-screen h-screen bg-[#111111] text-white flex flex-col overflow-hidden">
    <Router>
      <Header/>
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path='/' Component={homepage}></Route>
          <Route path='/coins/:id' Component={CoinPage}></Route>
          <Route path='/Editor' Component={Editor}></Route>
        </Routes>
      </div>
    </Router>
  </div>
  );
}

export default App;
