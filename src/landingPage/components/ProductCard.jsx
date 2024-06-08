const ProductCard = ({ data, isOdd }) => {
  return (
    <div id={data.id} className={`py-8 ${!isOdd ? "bg-blackGold" : ""}`}>
      <div
        className={`${
          isOdd ? "" : " lg:flex-row-reverse"
        }  flex flex-col-reverse lg:flex-row container mx-auto items-center justify-center`}
      >
        <div className="lg:w-[50%] mx-4 productBg min-h-[500px]">
          <h2 className="text-3xl font-semibold my-8 text-gold text-center lg:text-right">
            <span className="text-4xl ml-3 ">:</span>
            {data.label}
          </h2>
          <p className="text-xl py-6 ">{data.desc}</p>
        </div>
        <div className="lg:w-[50%] ">
          <img
            className="max-w-[400px] mx-auto"
            src={data.productImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
