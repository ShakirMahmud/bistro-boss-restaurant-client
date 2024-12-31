import SectionTitle from "../../components/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import { Link } from "react-router-dom";

const Featured = () => {
    return (
        <div className="featuredItem bg-fixed pt-16 pb-20 px-4 md:px-16 lg:px-24 my-12">
            <SectionTitle
                subHeading={"---Check It Out---"}
                heading={"Featured Item"}
            ></SectionTitle>
            <div className="text-white flex flex-col md:flex-row justify-center items-center gap-6">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <img
                        src={featuredImg}
                        alt="Featured Item"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                {/* Text Section */}
                <div className="w-full md:w-1/2 md:ml-6">
                    <p className="text-lg md:text-xl font-semibold mb-4">
                        March 20, 2023 <br />
                        WHERE CAN I GET SOME?
                    </p>
                    <p className="text-sm md:text-base leading-6 text-gray-300">
                        In the bustling world of culinary arts, the spotlight is
                        on a dish that perfectly blends flavors and textures.
                        Crafted with care, this featured item combines locally
                        sourced ingredients to create a masterpiece that's as
                        delightful to the eyes as it is to the palate. Indulge
                        in the harmony of savory, fresh, and zesty notes in
                        every bite.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/read-more"
                            className="text-sm md:text-lg bg-opacity-10 border-b-2 border-white rounded-lg px-5 py-2 hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
