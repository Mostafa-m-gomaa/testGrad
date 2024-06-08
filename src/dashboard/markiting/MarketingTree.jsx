import { useContext, useEffect, useState } from "react";
import TreeMember from "./TreeMember";
import { AppContext, route } from "../../App";
import { FaCrown } from "react-icons/fa";

import placeHolder from "../../assets/userPlaceHolder.jpg";
const MarketingTree = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const { setLoading } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const [children, setChildren] = useState([]);
  useEffect(() => {
    setLoading(true);
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
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="p-6  bg-dark rounded-2xl border border-gray m-6 sm:m-12">
      {data.role === "marketer" || data.role === "admin" ? (
        <div>
          <div
            className="max-w-[100%] max-h-[80vh] overflow-auto "
            style={{ direction: "ltr" }}
          >
            <div className="tree">
              <ul>
                <li>
                  <div className="relative">
                    <FaCrown className="text-4xl text-gold -top-4 absolute -left-4 rotate-[-45deg]" />

                    <img
                      src={data?.profileImg ? data?.profileImg : placeHolder}
                      onError={(e) => {
                        e.target.src = placeHolder;
                      }}
                    />
                    <span>{data.name}</span>
                  </div>
                  <ul>
                    {children.map((child) => (
                      <TreeMember level={1} data={child} key={child._id} />
                    ))}
                    {children.length === 0 && "لا يوجد اعضاء فريق"}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="font-semibold text-xl text-center">
          يجب انت تكون مسوق لتري فريقك
        </h2>
      )}
    </div>
  );
};

export default MarketingTree;
