import React, { useEffect } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function Blogs() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            delay: 900,
            once: true
        });
    }, []);

    const blogPosts = [
        {
            id: 1,
            title: "Top 10 Car Rental Tips for a Smooth Trip",
            date: "August 12, 2025",
            image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1470&q=80",
            excerpt: "Planning a trip? Discover our expert car rental tips to save money and travel comfortably.",
            category: "Travel Tips"
        },
        {
            id: 2,
            title: "Why Choose Khan Rent A Car for Your Next Journey",
            date: "August 8, 2025",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1470&q=80",
            excerpt: "From luxury SUVs to budget-friendly options, we have the perfect ride for your needs.",
            category: "Company News"
        },
        {
            id: 3,
            title: "Exploring Bangladesh: Best Road Trips",
            date: "August 1, 2025",
            image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1368&q=80",
            excerpt: "Check out our guide to the most scenic road trips across Bangladesh.",
            category: "Destinations"
        },
    ];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white mt-10">
            {/* Hero Section */}
            <div
                data-aos="fade-down-right"
                className="relative py-16 sm:py-20 px-4 sm:px-6 text-center bg-[url('https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center bg-blend-overlay bg-black/50"
            >
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block px-3 py-1 mb-4 text-xs sm:text-sm font-semibold text-yellow-400 bg-black/30 rounded-full backdrop-blur-sm">
                        Latest Updates
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                        Discover Our <span className="text-yellow-400">Blog</span> Posts
                    </h1>
                    <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-200 px-2">
                        Stay updated with the latest tips, guides, and news from Khan Rent A Car.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3"
                >
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-white bg-yellow-500 rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Text */}
                            <div className="relative px-4 sm:px-6 py-6 sm:py-8 bg-white">
                                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3">
                                    <FaCalendarAlt className="mr-2 text-yellow-500" />
                                    {post.date}
                                </div>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base mb-5">{post.excerpt}</p>
                                <button className="flex items-center font-semibold text-yellow-600 hover:text-yellow-700 transition-colors duration-300 text-sm sm:text-base">
                                    Read More <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 sm:mt-20 text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Want to see more articles?
                    </h3>
                    <p className="max-w-2xl mx-auto text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
                        Subscribe to our newsletter to get the latest travel tips and special offers.
                    </p>
                    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-0">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-2 sm:py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                        />
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-colors duration-300 text-sm sm:text-base">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
