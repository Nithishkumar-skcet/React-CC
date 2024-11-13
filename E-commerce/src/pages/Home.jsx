import React from "react";
import Navbar from "./Navbar";
import AllProducts from "./AllProducts";
import Footer from "./Footer";
// import ImageSlider from "./Slider";
// import SearchComponent from "./SearchComponent";


function Home() {
  return (
    <div>
      <Navbar />
      {/* <ImageSlider/> */}
      {/* <SearchComponent/> */}
      <AllProducts/> 
      <Footer />

    </div>
  );
}

export default Home;
