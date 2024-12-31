import React from 'react';
import Banner from './Banner';
import Category from './Category';
import ChefService from './ChefService';
import PopularMenu from './PopularMenu';

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <Category />
            <ChefService/>
            <PopularMenu/>
        </div>
    );
};

export default Home;