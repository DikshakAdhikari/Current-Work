"use client"
import React, { useState } from 'react';

const venues = [
  {
    name: 'Udaipur',
    description: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.',
    imageUrl: "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg",
  },
  {
    name: 'Jaipur',
    description: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.',
    imageUrl: "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg",
  },
  {
    name: 'Jodhpur',
    description: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.',
    imageUrl: "https://res.cloudinary.com/liaison-inc/image/upload/f_auto/q_auto,w_1200/v1694101952/content/fash/fash-bride-and-groom-at-Indian-wedding.jpg",
  },
 
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % venues.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + venues.length) % venues.length);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mb-8">Top Wedding Venues</h2>
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="bg-yellow-500 text-white p-2 rounded-full"
        >
          &#8592;
        </button>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {venues.map((venue, index) => (
              <div key={index} className={`flex-none w-full ${index === current ? '' : 'filter blur-sm'}`}>
                <div className="relative">
                  <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white rounded-b-lg">
                    <h3 className="text-2xl font-bold">{venue.name}</h3>
                    <p className="text-sm">{venue.description}</p>
                    <button className="mt-2 bg-white text-black py-1 px-3 rounded">
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="bg-yellow-500 text-white p-2 rounded-full"
        >
          &#8594;
        </button>
      </div>
      <div className="text-center mt-8">
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-full">
          View All
        </button>
      </div>
    </div>
  );
};

export default Carousel;
