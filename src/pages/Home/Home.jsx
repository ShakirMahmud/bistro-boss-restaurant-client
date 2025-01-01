import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import CallUs from './CallUs';
import Category from './Category';
import ChefService from './ChefService';
import Featured from './Featured';
import PopularMenu from './PopularMenu';
import Recommends from './Recommends';
import Testimonials from './Testimonials';

const Home = () => {

    return (
        <div className=''>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner />
            <Category />
            <ChefService />
            <PopularMenu />
            <CallUs />
            <Recommends />
            <Featured/>
            <Testimonials/>
        </div>
    );
};

export default Home;