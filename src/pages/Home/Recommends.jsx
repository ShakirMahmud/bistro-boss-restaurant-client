import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import FoodCard from '../../components/FoodCard';

const Recommends = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('menu.json')
            .then((res) => res.json())
            .then((data) => {
                const offeredItems = data.filter((item) => item.category === 'offered');
                setMenu(offeredItems);
            });
    }, []);

    return (
        <section className="w-4/5 mx-auto my-12">
            <SectionTitle
                heading={"Chef Recommends"}
                subHeading={"---Should Try---"}
            ></SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {menu.map((item) =><FoodCard key={item._id} item={item} />)}
            </div>
        </section>
    );
};

export default Recommends;
