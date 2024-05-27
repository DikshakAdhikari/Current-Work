import CardInfo from "./(Components)/CardInfo.jsx";
import Categories from "./(Components)/(Categories)/Categories.jsx";
import Navbar from "./(Components)/Navbar.jsx";
import Footer from "./(Components)/Footer.jsx";
import Carousel from "./(Components)/WeddingCarousel.jsx";
import WeddingVendors from "./(Components)/(WeddingCategories)/WeddingVendors.jsx";



export default function Home() {
  return (
   <div className=" bg-gray-200 flex flex-col justify-between">
    <div>
    <Navbar />
    <CardInfo />
    <Categories />
    <Carousel />
    <WeddingVendors />
    </div>
    <Footer />
   </div>
  );
}
