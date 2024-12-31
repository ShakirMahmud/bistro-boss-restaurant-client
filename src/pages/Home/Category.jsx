import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../assets/home/slide1.jpg';
import slide2 from '../../assets/home/slide2.jpg';
import slide3 from '../../assets/home/slide3.jpg';
import slide4 from '../../assets/home/slide4.jpg';
import slide5 from '../../assets/home/slide5.jpg';
import SectionTitle from '../../components/SectionTitle';

const Category = () => {
    return (
        <div className="my-12 w-full lg:w-4/5 mx-auto">
            <SectionTitle
                subHeading={"---From 11:00am to 10:00pm---"}
                heading={"Order Online"}
            ></SectionTitle>
            <Swiper
                spaceBetween={20}
                centeredSlides={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1, // Show 1 slide on mobile
                    },
                    640: {
                        slidesPerView: 2, // Show 2 slides on small tablets
                    },
                    1024: {
                        slidesPerView: 3, // Show 3 slides on desktops
                    },
                    1280: {
                        slidesPerView: 4, // Show 4 slides on large screens
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className="object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]" src={slide1} alt="Salad" />
                    <p
                        className="text-lg md:text-xl lg:text-3xl font-medium italic text-white uppercase text-center -mt-16 md:-mt-20 lg:-mt-24"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
                    >
                        Salad
                    </p>
                </SwiperSlide>

                <SwiperSlide>
                    <img className="object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]" src={slide2} alt="Pizza" />
                    <p
                        className="text-lg md:text-xl lg:text-3xl font-medium italic text-white uppercase text-center -mt-16 md:-mt-20 lg:-mt-24"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
                    >
                        Pizza
                    </p>
                </SwiperSlide>

                <SwiperSlide>
                    <img className="object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]" src={slide3} alt="Soup" />
                    <p
                        className="text-lg md:text-xl lg:text-3xl font-medium italic text-white uppercase text-center -mt-16 md:-mt-20 lg:-mt-24"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
                    >
                        Soup
                    </p>
                </SwiperSlide>

                <SwiperSlide>
                    <img className="object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]" src={slide4} alt="Dessert" />
                    <p
                        className="text-lg md:text-xl lg:text-3xl font-medium italic text-white uppercase text-center -mt-16 md:-mt-20 lg:-mt-24"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
                    >
                        Dessert
                    </p>
                </SwiperSlide>

                <SwiperSlide>
                    <img className="object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]" src={slide5} alt="Salad" />
                    <p
                        className="text-lg md:text-xl lg:text-3xl font-medium italic text-white uppercase text-center -mt-16 md:-mt-20 lg:-mt-24"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
                    >
                        Salad
                    </p>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;
