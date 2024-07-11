import Image from "next/image";
import Navbar from "./(Components)/Navbar";

import HomePage from "./(Components)/HomePage";
export default function Home() {
  return (
    <div>
    <div className="bg-black h-[100vh]">
    <Navbar />
    <HomePage/>
  </div>

  </div>
  );
}
