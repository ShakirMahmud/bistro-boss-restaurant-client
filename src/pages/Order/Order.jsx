import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../hooks/useMenu';
import OrderTab from './OrderTab';
import Cover from '../Shared/Cover';
import orderImg from '../../assets/shop/banner2.jpg'

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(category ? initialIndex : 0);
    const [menu] = useMenu();

    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div className="mb-12">
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>
            <Cover
                img={orderImg}
                banner={true}
                title="Order Food"
                subTitle="Would you like to try a dish?"
            />
            <div className="mt-12 w-11/12 lg:w-4/5 mx-auto">
                <Tabs 
                    selectedIndex={tabIndex} 
                    onSelect={(index) => setTabIndex(index)}
                    className="custom-tabs"
                >
                    <TabList className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 border-b  pb-2 mb-8 overflow-x-auto">
                        {categories.map((cat, index) => (
                            <Tab 
                                key={cat}
                                className={`
                                    text-lg md:text-xl font-medium py-2 px-1 
                                    cursor-pointer capitalize transition-colors
                                    hover:text-yellow-600 outline-none
                                    ${tabIndex === index ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-600'}
                                `}
                                selectedClassName="!border-b-2 !border-yellow-600"
                            >
                                {cat}
                            </Tab>
                        ))}
                    </TabList>

                    <div className="mt-6">
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
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;