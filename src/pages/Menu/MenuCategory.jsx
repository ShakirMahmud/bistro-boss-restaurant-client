import { Link } from "react-router-dom";
import MenuItem from "../Shared/MenuItem";
import Cover from "../Shared/Cover";

const MenuCategory = ({ items, img, title, subTitle }) => {
    return (
        <div>
            {title &&
                <Cover
                    img={img}
                    banner={false}
                    title={title}
                    subTitle={subTitle}
                ></Cover>
            }
            <div className="w-11/12 lg:w-4/5 mx-auto my-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                    {items.map(item => (
                        <MenuItem key={item._id} item={item} />
                    ))}
                </div>
                <div className="w-full flex justify-center mt-8">
                    <Link
                        to={`/order/${title}`}
                        className="text-base sm:text-lg lg:text-xl text-[#1F2937] border-b-[3px] border-[#1F2937] rounded-lg px-6 py-3 hover:bg-[#1F2937] hover:text-[#BB8506] hover:border-[#BB8506]  transition-all duration-300 uppercase"
                    >
                        Order Your Favorite Food
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;