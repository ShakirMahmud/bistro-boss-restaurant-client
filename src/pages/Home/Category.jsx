import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import slide5 from '../../assets/home/slide5.jpg'

const Category = () => {
    return (
        <div className='my-12 w-4/5 mx-auto'>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >

                <SwiperSlide className=''>
                    <img className='object-cover w-full h-[400px]' src={slide1} alt="" />
                    <p className='text-3xl font-medium italic drop-shadow-2xl text-white uppercase text-center -mt-24' style={{'textShadow': "4px 4px 4px rgba(0, 0, 0, 0.5)"}}>Salad</p>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='object-cover w-full h-[400px]' src={slide2} alt="" />
                    <p className='text-3xl font-medium italic shadow-2xl text-white uppercase text-center -mt-24' style={{'textShadow': "4px 4px 4px rgba(0, 0, 0, 0.5)"}}>Pizzas</p>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='object-cover w-full h-[400px]' src={slide3} alt="" />
                    <p className='text-3xl font-medium italic shadow-2xl text-white uppercase text-center -mt-24' style={{'textShadow': "4px 4px 4px rgba(0, 0, 0, 0.5)"}}>Soup</p>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='object-cover w-full h-[400px]' src={slide4} alt="" />
                    <p className='text-3xl font-medium italic shadow-2xl text-white uppercase text-center -mt-24' style={{'textShadow': "4px 4px 4px rgba(0, 0, 0, 0.5)"}}>Dessert</p>
                </SwiperSlide>
                <SwiperSlide className=''>
                    <img className='object-cover w-full h-[400px]' src={slide5} alt="" />
                    <p className='text-3xl font-medium italic shadow-2xl text-white uppercase text-center -mt-24' style={{'textShadow': "4px 4px 4px rgba(0, 0, 0, 0.5)"}}>Salad</p>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;