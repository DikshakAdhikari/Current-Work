"use client"
import React, { useState } from 'react';

const venues = [
  {
    name: 'Udaipur',
    description: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.',
    imageUrl: "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/03/A-wedding-going-on-at-Oberoi-Udaivilas-in-Udaipur.jpg",
  },
  {
    name: 'Jaipur',
    description: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.',
    imageUrl: "https://cdn0.weddingwire.in/article/7845/3_2/960/jpg/5487-jaibagh-palace-jaibaghpalace-lead1.jpeg",
  },
  {
    name: 'Jodhpur',
    description: 'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet.',
    imageUrl: "https://static.toiimg.com/thumb/width-600,height-400,msid-42810873.cms",
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
   
    <div className="w-full mt-16 py-8 px-14 max-w-4xl mx-auto ">
      <h2 className="text-5xl font-semibold text-center mb-8">Top Wedding Venues</h2>
      <div className="flex items-center justify-between">
       
        <div className="flex-1 overflow-hidden relative">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {venues.map((venue, index) => (
              <div key={index} className={`flex-none w-full ${index === current ? '' : 'filter blur-sm'}`}>
                <div className="relative">
                  <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    className="w-[100vw] h-[50vh] object-cover rounded-lg"
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
       
      </div>
      <div className="text-center mt-8">
      <button
          onClick={prevSlide}
          className="  p-2  text-yellow-500 text-7xl"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className=" p-2  text-yellow-500 text-7xl"
        >
          &#8594;
        </button>
      </div>
      <div className=' mt-3 justify-center flex w-[100%]'>
      <button className=' rounded-md border-2 border-gray-600 text-sm px-5 py-2'>View All {"->"}</button>
      </div>
    </div>
    
  );
};

export default Carousel;
