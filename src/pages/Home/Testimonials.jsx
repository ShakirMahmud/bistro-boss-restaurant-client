import { FaQuoteLeft } from "react-icons/fa"; 
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-server-shakir.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className='w-11/12 lg:w-4/5 mx-auto my-12'>
            <SectionTitle
                heading={"Testimonials"}
                subHeading={"---What Our Customers Say---"}
            ></SectionTitle>
            <div>
                <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}>
                            <div className='mt-2 lg:mt-12 text-center w-9/12 mx-auto flex flex-col items-center'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="mt-2 lg:mt-12 text-[84px]"><FaQuoteLeft /></p>

                                <p className='mt-6 text-xl text-[#444444]'>{review.details}</p>
                                <h3 className='text-3xl text-[#CD9003] mt-2'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </section>
    );
};

export default Testimonials;