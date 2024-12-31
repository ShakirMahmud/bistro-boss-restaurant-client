import img from '../../assets/home/chef-service.jpg';

const ChefService = () => {
    return (
        <div className="w-4/5 mx-auto mb-12">
            <div
                style={{ backgroundImage: `url(${img})` }}
                className="h-[400px] bg-cover bg-center flex items-center justify-center"
            >
                <div className="bg-white  text-center w-4/5 mx-auto py-6 rounded shadow-md">
                    <h2 className="text-4xl font-bold mb-4">Bistro Boss</h2>
                    <p className="text-lg text-gray-700">
                        Experience the art of exquisite culinary mastery at Bistro Boss. 
                        Indulge in our chef's handpicked ingredients, creatively prepared to bring you flavors that captivate your senses.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChefService;
