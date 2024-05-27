"use client"
import React, { useState, useEffect } from 'react';

const images = [
  { id: 1, src: 'https://www.eventfaqs.com/Uploads/News/Content/whatsapp-image-2023-10-20-at-12.30.25-pm.jpg', alt: 'Description 1' },
  { id: 2, src: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_wedding_Delhi.jpg', alt: 'Description 2' },
  { id: 3, src: 'https://www.thewedcafe.com/wp-content/uploads/2020/05/09-PRD_0113-Edit.jpg', alt: 'Description 3' },
  { id: 4, src: 'https://meredithmckee.com/wp-content/uploads/2016/04/13-6739-post/1-Indian-Wedding-Photographer.jpg', alt: 'Description 4' },
  { id: 5, src: 'https://static01.nyt.com/images/2023/05/14/multimedia/FAT-INDIAN-WEDDINGS-01-hptq/FAT-INDIAN-WEDDINGS-01-hptq-superJumbo.jpg', alt: 'Description 5' },
];


const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
  
    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);
  
    const visibleImages = images.slice(currentIndex, currentIndex + 5).concat(
      images.slice(0, Math.max(0, (currentIndex + 5) - images.length))
    );
  
    return (
      <div className="flex flex-col items-center pb-16 justify-center p-8">
        <h1 className="text-5xl font-bold mb-6">Gallery</h1>
        <p className="text-center w-1/2 mb-10 mt-4 text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua dolor sit amet, consectetur adipiscing.
        </p>
        <div className="flex space-x-4 gap-4 overflow-hidden">
          {visibleImages.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className={` h-72 w-72 object-cover  transition-transform ${
                index === 2 ? ' transition duration-150 border-[1px] border-black ' : ''
              }`}
            />
          ))}
        </div>
        <div className="relative w-1/3 mt-16">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-300">
            <div
              className="h-1 bg-black transition-all"
              style={{ width: `${(currentIndex + 1) * (100 / images.length)}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-2 text-gray-700 text-lg">
          {currentIndex + 1}/{images.length}
        </div>
      </div>
    );
  };
  
  export default Gallery;