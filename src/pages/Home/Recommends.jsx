import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';

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
                {menu.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-52 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            <button className="w-full text-xl font-medium bg-[#E8E8E8] text-[#BB8506] py-2 px-4 rounded-lg border-b-4 border-[#BB8506] hover:bg-[#1F2937] transition duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Recommends;
