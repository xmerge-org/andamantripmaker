'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Slider = () => {
    const slides = [
        {
            id: 1,
            image: '/assets/images/bg/2.jpg',
            alt: 'Slide 1',
        },
        {
            id: 2,
            image: '/assets/images/bg/3.jpg',
            alt: 'Slide 2',
        },
    ];

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
        >
            {slides.map(slide => (
                <SwiperSlide key={slide.id}>
                    <div className="slide-inner relative w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${slide.image})` }}>
                        <div className="absolute inset-0 bg-slate-900/70"></div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;