import React from "react";

const WeddingCard = () => {
  return (
    <div>
      <div className=" grid grid-cols-8  h-[45vh] gap-5 w-[40vw]">
        <div className=" col-span-5 ">
          <img
            className=" h-[45vh] rounded-lg object-cover"
            src={
              "https://assets.vogue.in/photos/5ce424d02e615019d80b0184/master/pass/history-of-bridal-mehandi.jpg"
            }
          />
        </div>
        <div className=" col-span-3 ">
          <div className=" flex flex-col h-[100%] justify-between gap-3">
            <div className=" ">
              <img
                className=" h-[14vh] rounded-lg object-cover"
                src={
                  "https://cdn0.weddingwire.in/article-real-wedding-o/6454/original/1280/jpg/15_44546.jpeg"
                }
              />
            </div>
            <div className=" ">
              {" "}
              <img
                className=" h-[14vh] rounded-lg object-cover"
                src={
                  "https://www.weddingsonline.in/blog/wp-content/uploads/2017/10/22007479_1428442160607923_4374463494153948249_n.jpg"
                }
              />
            </div>
            <div className=" ">
              {" "}
              <img
                className=" h-[14vh] rounded-lg object-cover"
                src={
                  "https://ik.imagekit.io/pu0hxo64d/uploads/gallery/tr:w-450,h-250/terrace-party-at-eden-graden-736.jpeg"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingCard;
