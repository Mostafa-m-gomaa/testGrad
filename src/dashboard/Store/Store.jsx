import { useContext, useEffect, useRef, useState } from "react";

import ProductCard from "./ProductCard";
import { AppContext, route } from "../../App";
const Store = () => {
  const { setLoading } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [cateId, setCateId] = useState("");
  const contianer = useRef();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetch(`${route}store/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCats(data.data);
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    fetch(
      `${route}store/products?page=${currentPage}${
        cateId ? `&category=${cateId}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
        setPagesNumber(data.paginationResult.numberOfPages);
      });
  }, [cateId, currentPage]);
  return (
    <div>
      <div className="cats m-6 ">
        <div className="wrapper" ref={contianer}>
          <div
            className="option"
            onClick={() => {
              setCurrentPage(1);
              setCateId("");
            }}
          >
            <input className="input" type="radio" name="btn" value="All" />
            <div className="btn">
              <span className="span">All</span>
            </div>
          </div>
          {cats.map((cat) => {
            return (
              <div
                className="option"
                key={cat._id}
                onClick={() => {
                  setCurrentPage(1);
                  setCateId(cat._id);
                }}
              >
                <input
                  className="input"
                  type="radio"
                  name="btn"
                  value={cat.title}
                />
                <div className="btn">
                  <span className="span">{cat.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-6">
        {products.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
      {pagesNumber > 1 && (
        <div className="bg-dark border border-gray p-4 m-6  rounded-xl">
          <h2 className="text-xl text-center my-4">هناك {pagesNumber} صفحات</h2>
          <div className="flex w-fit items-center justify-center border mx-auto border-lightGray rounded-xl">
            <button
              className={`rounded-r-xl p-3 text-center disabled:cursor-not-allowed w-[90px] bg-gold text-dark disabled:bg-gray`}
              disabled={pagesNumber <= currentPage}
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
                contianer.current.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              التالي
            </button>
            <div className=" p-3 text-center w-[90px]">{currentPage}</div>
            <button
              className={`rounded-l-xl p-3 text-center disabled:cursor-not-allowed w-[90px] bg-gold text-dark disabled:bg-gray`}
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
                contianer.current.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              السابق
            </button>
          </div>
        </div>
      )}
      {!products.length && (
        <div className="text-lightGray text-4xl my-20 text-center w-full">
          Can not find any products
        </div>
      )}
    </div>
  );
};

export default Store;
