import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import bannerImg from '../../assets/menu/banner3.jpg';
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle";
import MenuCategory from "./MenuCategory";
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover
                img={bannerImg}
                banner={true}
                title={"Our Menu"}
                subTitle={"Would you like to try a dish?"}
            ></Cover>
            {/* Today's Offer  */}
            <SectionTitle
                heading={"Today's Offer"}
                subHeading={"---Don't Miss---"}
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            {/* Desserts  */}
            <MenuCategory
                items={desserts}
                title={"dessert"}
                subTitle={"Indulge your sweet tooth with our delectable selection of desserts. From rich chocolate treats to creamy delights, our desserts are the perfect ending to your meal."}
                img={dessertImg}
            ></MenuCategory>
            {/* Pizza  */}
            <MenuCategory
                items={pizzas}
                title={"pizza"}
                subTitle={"Enjoy our handcrafted pizzas made with the freshest ingredients. Each slice is a perfect harmony of flavors that will leave you craving for more."}
                img={pizzaImg}
            ></MenuCategory>
            {/* Salad  */}
            <MenuCategory
                items={salads}
                title={"salad"}
                subTitle={"Fresh, crisp, and full of flavor! Our salads are a delightful mix of garden-fresh vegetables and vibrant dressings, perfect for a healthy and satisfying meal."}
                img={saladImg}
            ></MenuCategory>
            {/* Soup  */}
            <MenuCategory
                items={soups}
                title={"soup"}
                subTitle={"Warm up with our comforting soups. Made with love and the finest ingredients, they are the perfect start to your meal or a cozy treat on a cold day."}
                img={soupImg}
            ></MenuCategory>
        </div>
    );
};

export default Menu;
