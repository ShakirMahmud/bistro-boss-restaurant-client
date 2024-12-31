import React from 'react';
import Banner from './Banner';
import Category from './Category';
import ChefService from './ChefService';

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <Category />
            <ChefService/>
        </div>
    );
};

export default Home;