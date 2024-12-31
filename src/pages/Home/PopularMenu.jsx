import { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import MenuItem from '../Shared/MenuItem';

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems)
            })
    }, [])
    return (
        <section className='w-4/5 mx-auto my-12'>
            <SectionTitle
                heading={"From Our Menu"}
                subHeading={"---Check It Out---"}
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-10'>
                {
                    menu.map(item => <MenuItem 
                        key={item._id} 
                        item={item}
                        ></MenuItem>)
                }
            </div>

        </section>
    );
};

export default PopularMenu;