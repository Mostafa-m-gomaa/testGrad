const LeaderCard = ({ name, about, image, isOdd }) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center ${
        isOdd ? "md:flex-row-reverse" : ""
      } my-4 bg-blackGold`}
    >
      <img
        src={image}
        loading="lazy"
        className="h-[400px] rounded-full"
        alt={`${name} image`}
      />
      <div>
        <h2 className="text-3xl text-center md:text-right text-gold mx-6 my-4">
          {name}
        </h2>
        <p className="my-8 mx-6">{about}</p>
      </div>
    </div>
  );
};

export default LeaderCard;
