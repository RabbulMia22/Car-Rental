import React from "react";
import CountUp from "react-countup";

function Counter() {
  const stats = [
    { number: 4000, suffix: "+", label: "Number Of Client" },
    { number: 99, suffix: "%", label: "Happy Customer" },
    { number: 100, prefix: "+", label: "Complains" },
    { number: 5, suffix: "+", label: "Years of Experience" },
  ];

  return (
    <div
      className="bg-[#163984] text-white relative flex items-center"
      style={{
        clipPath: "polygon(0 8%, 90% 8, 100% 92%, 0, 100%)",
        minHeight: "180px", 
      }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center gap-10 px-6 py-10">
        {stats.map((item, index) => (
          <div key={index}>
            <h2 className="text-3xl md:text-4xl font-bold">
              <CountUp
                start={0}
                end={item.number}
                duration={2.5}
                separator=","
                suffix={item.suffix || ""}
                prefix={item.prefix || ""}
              />
            </h2>
            <p className="mt-2 text-sm md:text-base font-semibold">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Counter;
