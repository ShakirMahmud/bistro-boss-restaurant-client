
const MenuItem = ({item}) => {
    const {image, price, recipe, name} = item;
    return (
        <div className="flex space-x-3 items-start ">
            <img className="w-[118px] h-[104px] rounded-tr-full rounded-br-full rounded-bl-full object-contain " src={image} alt="" />
            <div>
                <h3 className="uppercase text-[#151515] text-xl">{name}------------------</h3>
                <p className="text-[#737373] mt-2">{recipe}</p>
            </div>
            <p className="text-xl text-[#BB8506] flex justify-end flex-grow">${price}</p>
        </div>
    );
};

export default MenuItem; 