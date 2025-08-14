import React from "react";
import Marquee from "react-fast-marquee";

function BrandImage() {
  const images = [
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/1.webp", id: 1 },
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/2.webp", id: 2 },
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/3.webp", id: 3 },
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/4.webp", id: 4 },
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/3.webp", id: 5 },
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/1.webp", id: 6 },
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/3.webp", id: 7 },
    { image: "https://khanrentacar.com/wp-content/uploads/2025/07/4.webp", id: 8 },
  ];

  return (
    <div className="py-6 bg-white max-w-7xl mx-auto mt-4">
      <Marquee
        pauseOnHover
        gradient={false}
        speed={50} // speed of scroll
      >
        {images.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={`Brand ${item.id}`}
            className="mx-4 h-32 object-contain border-2 border-gray-200 rounded-lg shadow-md"
          />
        ))}
      </Marquee>
    </div>
  );
}

export default BrandImage;
