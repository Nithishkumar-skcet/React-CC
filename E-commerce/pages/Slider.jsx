// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// const ImageSlider = () => {
//   const settings = {
//     dots: true, // Show dots navigation
//     infinite: true, // Infinite scrolling
//     speed: 500, // Slide transition speed in milliseconds
//     slidesToShow: 1, // Number of slides to show
//     slidesToScroll: 1, // Number of slides to scroll at once
//     autoplay: true, // Enable autoplay
//     autoplaySpeed: 3000, // Autoplay speed in milliseconds
//   };

//   const images = [
//     'https://www.bigbasket.com/media/uploads/banner_images/hp_diwali_1600x460_181024_162V1eu.jpg?tr=w-1920,q=80',    
//     'https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26112.jpg?tr=w-1920,q=80' ,
//     'https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26108.jpg?tr=w-1920,q=80'  

//   ];

//   return (
//     <div style={{}}>
//     <div style={{ width: '1000px',height:'200px', margin: 'auto',borderRadius:'25px' }}>
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '400px',borderRadius:'40px' }} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//     </div>
//   );
// };

// export default ImageSlider;

// 
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    'https://www.bigbasket.com/media/uploads/banner_images/hp_diwali_1600x460_181024_162V1eu.jpg?tr=w-1920,q=80',    
    'https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26112.jpg?tr=w-1920,q=80',
    'https://www.bigbasket.com/media/uploads/banner_images/IBBN092113357-26108.jpg?tr=w-1920,q=80'
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
      <div style={{ width: '100%', maxWidth: '1000px', borderRadius: '25px', overflow: 'hidden' }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} style={{ padding: '0 10px' }}>
              <img 
                src={image} 
                alt={`Slide ${index + 1}`} 
                style={{ width: '100%', height: '400px', borderRadius: '40px', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
