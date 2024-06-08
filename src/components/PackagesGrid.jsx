import LargPackageCard from "./LargPackageCard";
const PackagesGrid = ({ packages }) => {
  return (
    <div className=" mx-auto container my-4">
      {packages?.map((item) => (
        <LargPackageCard key={item?._id} data={item} />
      ))}
    </div>
  );
};

export default PackagesGrid;
