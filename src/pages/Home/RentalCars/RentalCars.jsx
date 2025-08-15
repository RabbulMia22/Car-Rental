import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function RentalCars() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 900,
      once: true
    });
  }, []);
  const cars = [
    { img: "https://khanrentacar.com/wp-content/uploads/2025/03/p21-removebg-preview-e1748976372633.webp", title: "Sedan car rental services", passengers: "4", luggage: "3", doors: "4" },
    { img: "https://khanrentacar.com/wp-content/uploads/2025/06/Toyota-Land-Cruiser-Prado-Exterior.webp", title: "SUV (Prado, Harrier, Pajero) car rental services", passengers: "4", luggage: "3", doors: "4" },
    { img: "https://khanrentacar.com/wp-content/uploads/2025/06/img_591edf43e7bf0-e1495195478681.webp", title: "Noah, HiAce car rental services", passengers: "7-12", luggage: "5", doors: "4" },
  ];

  return (
    <section className="relative bg-[#0b2a5f] py-16 overflow-hidden mt-12">
      {/* Center glow + side shadow (optional, remove if not needed) */}
      <div className="max-w-7xl mx-auto">
        <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 35%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>

      {/* ===== Top curved multi-layer bands ===== */}
      <div className="pointer-events-none absolute top-0 left-0 w-full">
        <svg
          className="w-full h-[90px]"
          viewBox="0 0 1920 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 C 480 70, 1440 70, 1920 0 L1920 0 L0 0 Z" fill="#d5dbe6" />
          <path d="M0 0 C 480 55, 1440 55, 1920 0 L1920 0 L0 0 Z" fill="#c0c7d6" />
          <path d="M0 0 C 480 40, 1440 40, 1920 0 L1920 0 L0 0 Z" fill="#aab1c2" />
        </svg>
      </div>

      {/* Content */}
      <h2 className="relative z-10 text-center text-white text-3xl font-bold mb-10">
        Our Rental Cars
      </h2>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {cars.map((car, i) => (
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            key={i}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center"
          >
            <img src={car.img} alt={car.title} className="mb-4" />
            <h3 className="text-xl font-bold text-[#0b2a5f] text-center mb-4">{car.title}</h3>
            <ul className="text-sm text-gray-700 mb-4 space-y-1">
              <li>🚗 Max Passenger: {car.passengers}</li>
              <li>🧳 Luggage: {car.luggage}</li>
              <li>🚪 Doors: {car.doors}</li>
              <li>🏙️ Inside City Rental Service</li>
              <li>🛣️ Outside City Rental Service</li>
              <li>🚘 Car Body Rental Service</li>
            </ul>
            <div className="flex gap-2">
              <button className="bg-red-600 text-white px-4 py-2 rounded">📞 01319-258737</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">WhatsApp</button>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex justify-center mt-10">
        <button className="bg-white text-[#0b2a5f] px-6 py-2 rounded shadow hover:shadow-lg transition">
          See More
        </button>
      </div>

      {/* ===== Bottom curved multi-layer bands (mirror) ===== */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full rotate-180">
        <svg
          className="w-full h-[90px]"
          viewBox="0 0 1920 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 C 480 70, 1440 70, 1920 0 L1920 0 L0 0 Z" fill="#d5dbe6" />
          <path d="M0 0 C 480 55, 1440 55, 1920 0 L1920 0 L0 0 Z" fill="#c0c7d6" />
          <path d="M0 0 C 480 40, 1440 40, 1920 0 L1920 0 L0 0 Z" fill="#aab1c2" />
        </svg>
      </div>
      </div>
    </section>
  );
}
