import CardInfo from "./(Components)/CardInfo.jsx";
import Categories from "./(Components)/(Categories)/Categories.jsx";
import Navbar from "./(Components)/Navbar.jsx";
import Footer from "./(Components)/Footer.jsx";
import Carousel from "./(Components)/WeddingCarousel.jsx";
import WeddingVendors from "./(Components)/(Wedding-Categories)/WeddingVendors.jsx";
import MainComponent from "./(Components)/(Customer-Reviews)/Main.jsx";
import Gallery from "./(Components)/(Image-Gallery)/Gallery.jsx";




export default function Home() {
  return (
   <div className="  flex flex-col justify-between">
    <div>
    <Navbar />
    <CardInfo />
    <Categories />
    <Carousel />
    <WeddingVendors />
    <Gallery />
    <MainComponent />
    </div>
    <Footer />
   </div>
  );
}
