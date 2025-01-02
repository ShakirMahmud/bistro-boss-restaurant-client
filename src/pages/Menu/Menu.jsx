import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import banner from '../../assets/menu/banner3.jpg'

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover
                img={banner}
                banner={true}
                title={"Our Menu"}
                subTitle={"Would you like to try a dish?"}
            ></Cover>
            
            
        </div>
    );
};

export default Menu;