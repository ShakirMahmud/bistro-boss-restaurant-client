import { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import MenuItem from '../Shared/MenuItem';
import { Link } from 'react-router-dom';

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems);
            });
    }, []);

    return (
        <section className="w-11/12 lg:w-4/5 mx-auto my-12">
            {/* Section Title */}
            <SectionTitle
                heading={"From Our Menu"}
                subHeading={"---Check It Out---"}
            />
            
            {/* Menu Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {menu.map(item => (
                    <MenuItem key={item._id} item={item} />
                ))}
            </div>

            {/* Full Menu Button */}
            <div className="w-full flex justify-center mt-8">
                <Link
                    to="/menu"
                    className="text-base sm:text-lg lg:text-xl text-[#1F2937] border-b-[3px] border-[#1F2937] rounded-lg px-6 py-3 hover:bg-[#1F2937] hover:text-white hover:bg-opacity-90 transition-all duration-300"
                >
                    View Full Menu
                </Link>
            </div>
        </section>
    );
};

export default PopularMenu;
