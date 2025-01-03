import React from 'react';
import FoodCard from "../../components/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div className="order-tab-container">
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    }
                }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item._id}>
                        <FoodCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default OrderTab;