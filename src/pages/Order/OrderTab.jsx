import React from 'react';
import FoodCard from "../../components/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}" style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 32px;
                min-height: 32px;
                width: 32px;
                height: 32px;
                margin: 4px;
                font-size: 14px;
                background-color: #BB8506;
                color: ${className.includes('swiper-pagination-bullet-active') ? '#fff' : '#000'};
                background: ${
                  className.includes('swiper-pagination-bullet-active')
                    ? 'rgba(0, 0, 0, 0.9)'
                    : 'rgba(0, 0, 0, 0.2)'
                };
                border-radius: 50%;
                position: relative;
                
            ">${index + 1}</span>`;
        },
    };

    const swiperStyle = {
        width: "100%",
        paddingBottom: "120px", // Accommodates multiple lines
    };

    const swiperSlideStyle = {
        textAlign: "center",
        fontSize: "18px",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
    };

    return (
        <div className="order-tab-container">
            <Swiper
                style={swiperStyle}
                slidesPerView={1}
                spaceBetween={20}
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item._id} style={swiperSlideStyle}>
                        <FoodCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default OrderTab;
