import { Parallax } from 'react-parallax';

const Cover = ({ img, banner, title, subTitle }) => {
    return (
        <div>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={img}
                bgImageStyle={{ objectFit: "cover" }}
                bgImageAlt="the dog"
                strength={-200}
            >
                <div
                    className={`hero bg-cover bg-fixed ${banner ? " h-[400px]  lg:h-[800px]" : " h-[350px] lg:h-[700px]"}`}
                    >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className=" w-2/3 text-neutral-content text-center">
                        <div className=" bg-[#15151599] py-12 lg:py-36">
                            <h1 className={`${banner ? "text-6xl" : "text-4xl"} mb-5  font-bold uppercase`}>{title}</h1>
                            <p className="mb-5">
                                {subTitle}
                            </p>

                        </div>
                    </div>
                </div>
            </Parallax>

        </div>
    );
};

export default Cover;