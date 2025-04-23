// Carousel.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TrendingCoins } from '../../api/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = () => {
    const { currency } = CryptoState();
    const [trending, setTrending] = useState([]);

    const fetchTrendingCoins = async () => {
        try {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        } catch (error) {
            console.error("Error fetching trending coins:", error);
        }
    };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        const profit = coin?.price_change_percentage_24h >= 0;
        return (
            <Link className="carouselItem" to={`/coins/${coin.id}`} key={coin.id}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    className="carouselItem-img"
                />
                <div className="carouselItem-info">
                    <span className="carouselItem-symbol">
                        {coin?.symbol.toUpperCase()}
                    </span>
                    <span
                        className={`carouselItem-percent ${profit ? 'profit' : 'loss'}`}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </div>
                <span className="carouselItem-price">
                    ${coin?.current_price.toFixed(2)}
                </span>
            </Link>
        );
    });

    const responsive = {
        0: { items: 2 },
        512: { items: 4 },
    };

    return (
        <div className="carousel">
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
                autoPlayStrategy="none"
                autoPlayDirection="ltr"
                autoPlayActionDisabled={false}
            />
        </div>
    );
}

export default Carousel;