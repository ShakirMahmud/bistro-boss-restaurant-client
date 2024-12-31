import img from '../../assets/home/chef-service.jpg';

const ChefService = () => {
    return (
        <div className="w-11/12 lg:w-4/5 mx-auto mb-12">
            <div
                style={{ backgroundImage: `url(${img})`}}
                className="relative h-[400px] bg-cover bg-center flex items-center justify-center bg-fixed"
            >
                <div className="absolute inset-0 bg-white bg-opacity-0 backdrop-blur-sm"></div>
                <div className="bg-white  text-center w-4/5 mx-auto py-6 rounded shadow-sm z-10">
                    <h2 className="text-4xl font-bold mb-4">Bistro Boss</h2>
                    <p className="text-lg text-gray-700 p-1">
                        Experience the art of exquisite culinary mastery at Bistro Boss. 
                        Indulge in our chef's handpicked ingredients, creatively prepared to bring you flavors that captivate your senses.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChefService;
