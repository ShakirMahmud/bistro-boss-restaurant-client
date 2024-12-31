import SectionTitle from "../../components/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import { Link } from "react-router-dom";
const Featured = () => {
    return (
        <div className="featuredItem py-[130px] px-[300px] my-12">
            <SectionTitle
                subHeading={"---Check It Out---"}
                heading={"Featured Item"}
            ></SectionTitle>
            <div className="text-white md:flex justify-center items-center ">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p className="text-2xl">
                        March 20, 2023 <br />
                        WHERE CAN I GET SOME?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <div className='mt-6'>
                        <Link  className='text-xl bg-opacity-10 border-b-[3px] border-white rounded-lg px-5 py-4 hover:bg-white hover:text-black hover:border-black'>Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;