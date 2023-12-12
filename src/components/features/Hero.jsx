import React from 'react';
import banner from '@/assets/images/christmas-sale-banner.png';

const Hero = () => {
    return (
        <div className="mt-24">
            <img src={banner} alt="sale banner" className="-mb-7 w-full" />
            <button
                type="button"
                className="h-5 w-24 rounded-tr-lg bg-red-500 font-semibold text-white md:h-7 md:font-bold"
            >
                SHOP NOW
            </button>
        </div>
    );
};

export default Hero;
