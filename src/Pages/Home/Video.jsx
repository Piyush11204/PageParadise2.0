import React from 'react';

const Video = () => {
return (
    <div className="relative w-full h-screen overflow-hidden" data-aos="fade-up">
        {/* Video container with responsive sizing */}
        <div className="absolute inset-0" data-aos="zoom-in">
            <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source 
                    src="https://videos.pexels.com/video-files/8199394/8199394-hd_1920_1080_25fps.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>

        {/* Overlay with gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" data-aos="fade-in" />

        {/* Text overlay container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-4">
                Welcome to Page Paradise
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl">
                Discover amazing experiences and unforgettable moments that will take your breath away. Join us on this incredible journey.
            </p>
            <p className="text-lg mt-36 md:text-xl text-orange-400 max-w-2xl">
                Scroll down to explore more
            </p>
        </div>
    </div>
);
};

export default Video;