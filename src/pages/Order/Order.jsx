import { useState } from 'react';
import orderImg from '../../assets/shop/banner2.jpg'
import Cover from '../Shared/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div className='mb-12'>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover
                img={orderImg}
                banner={true}
                title={"Order Food"}
                subTitle={"Would you like to try a dish?"}
            ></Cover>

            <div className='mt-12 w-4/5 mx-auto'>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList >
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salads} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizzas} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soups} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={desserts} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;