import Banner from './Banner';
import CallUs from './CallUs';
import Category from './Category';
import ChefService from './ChefService';
import Featured from './Featured';
import PopularMenu from './PopularMenu';
import Recommends from './Recommends';

const Home = () => {

    return (
        <div className=''>
            <Banner />
            <Category />
            <ChefService />
            <PopularMenu />
            <CallUs />
            <Recommends />
            <Featured/>
        </div>
    );
};

export default Home;