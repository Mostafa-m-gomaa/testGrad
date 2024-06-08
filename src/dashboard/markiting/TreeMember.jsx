import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import placeHolder from "../../assets/userPlaceHolder.jpg";
import { route } from "../../App";
import { FaEye } from "react-icons/fa";

const TreeMember = ({ data, level }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [children, setChildren] = useState([]);
  const token = localStorage.getItem("token");

  const getData = function () {
    setIsLoading(true);
    fetch(`${route}marketing/getMyChildren/${data?._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setChildren(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  return (
    <li>
      <div>
        <img
          src={data?.profileImg ? data?.profileImg : placeHolder}
          onError={(e) => {
            e.target.src = placeHolder;
          }}
        />
        <span>{data?.name}</span>
        {level <= 4 && (
          <button
            onClick={() => {
              if (!show) getData();
              setShow((prev) => !prev);
            }}
            className="absolute w-8 h-8 flex items-center justify-center bg-gold text-dark text-xl rounded-full bottom-0 right-0"
          >
            {show ? <IoIosRemove /> : <IoMdAdd />}
          </button>
        )}
        <p className="absolute w-8 h-8 flex items-center justify-center bg-gold text-dark text-lg font-semibold rounded-full top-2 left-2">
          {level}st
        </p>
        {data?.startMarketing && (
          <Link
            to={`/marketing/log/${data?._id}`}
            className="absolute w-8 h-8 flex items-center justify-center bg-gold text-dark text-xl rounded-full bottom-0 left-0"
          >
            <FaEye />
          </Link>
        )}
      </div>
      {show && (
        <ul>
          {isLoading && "...يتم التحميل"}
          {!isLoading && (
            <>
              {children.length === 0
                ? "لا يوجد المزيد"
                : children.map((child) => (
                    <TreeMember
                      level={level + 1}
                      data={child}
                      key={child._id}
                    />
                  ))}
            </>
          )}
        </ul>
      )}
    </li>
  );
};

export default TreeMember;
