const LoadingSpinner = ({ isSmall }) => {
  return (
    <div className="h-[30vh] w-full flex items-center justify-center">
      <i
        className={`fa-solid fa-spinner fa-spin ${
          isSmall ? "text-5xl" : "text-7xl"
        }`}
      ></i>
    </div>
  );
};

export default LoadingSpinner;
