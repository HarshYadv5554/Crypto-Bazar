import React from 'react';
import bannerImage from '../../images/banner2.jpg';
import Carousel from './carousel'; // Adjust the path as necessary

function Banner() {
  return (
    <div className="relative bg-cover bg-center" style={{ height: "400px", backgroundImage: `url(${bannerImage})` }}>
      <div className="flex justify-center items-center h-full">
        <div className="text-center text-white">
          <h1 className="text-7xl mb-4">Crypto Bazar</h1>
          <p className="text-xl">A learning and visualizing platform for cryptocurrency</p>
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default Banner;

