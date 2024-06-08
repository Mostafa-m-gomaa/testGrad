import { useContext, useEffect, useState } from "react";
import { AppContext, route } from "../../App";
import MarketingForm from "./MarketingForm";
import SalesTable from "./SalesTable";
import InvoicesTable from "./InvoicesTable";
import toast from "react-hot-toast";
import "./marketing.css";
import { Link, useParams } from "react-router-dom";

const Marketing = ({ myLog }) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const myId = data._id;
  const token = localStorage.getItem("token");
  const { setLoading } = useContext(AppContext);
  const userId = useParams()?.id;
  const [myData, setMyData] = useState({});
  useEffect(() => {
    if (myLog) {
      if (data.startMarketing === false) startMarketingFun();
      else getData();
    } else getData();
  }, []);
  const startMarketingFun = function () {
    setLoading(true);
    fetch(`${route}marketing/startMarketing`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        data.startMarketing = true;
        localStorage.setItem("data", JSON.stringify(data));
        getData();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getData = function () {
    setLoading(true);
    fetch(
      `${route}marketing/${
        myLog ? "getMyMarketLog" : `getMarketLog/${userId}`
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setMyData(res.marketLog);

        if (res.marketLog.role && myLog) {
          data.role = res.marketLog.role;
          localStorage.setItem("data", JSON.stringify(data));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  console.log(myData);
  const getRank = function () {
    let rank = "SuperVisor";
    const totalSales = myData?.customerSales + myData?.mySales;
    if (totalSales > 15) rank = "Royal SuperVisor";
    if (totalSales > 30) rank = "Royal Director";
    if (totalSales > 51) rank = "Founder";
    return rank;
  };
  return (
    <>
      <div className="p-6 space-y-6 bg-dark rounded-2xl border border-gray m-6 sm:m-12">
        <h2 className="font-semibold text-2xl text-center">
          Leader board: {myData?.marketer?.name}
        </h2>
        <h2 className="font-semibold text-sm text-center">
          Email : {myData?.marketer?.email}
        </h2>
        <h2 className="font-semibold text-sm text-center">
          Role : {myData?.role}
        </h2>
        <h2 className="font-semibold text-sm text-center">
          Rank : {getRank()}
        </h2>
        {myLog && (
          <button
            className="space-x-2 block w-fit mx-auto px-6 py-3 border border-gold rounded-xl text-gold font-semibold text-lg my-4"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/login?inviteId=${myId}`
              );
              toast.success("تم نسخ لينك الدعوه");
            }}
          >
            اضغط هنا لتنسخ لينك دعوتك
            <i className="fa-regular fa-copy"></i>
          </button>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border space-y-2 border-gray rounded-md p-6">
            <div className="flex mb-4 justify-between items-center">
              <h4>إجمالي المبيعات</h4>
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
            <b className="text-xl">${myData?.totalSalesMoney}</b>
            <div className="flex gap-2 text-[gray]">
              <p>الربح : {myData?.profits}$</p> -
              <p>النسبة : {myData?.percentage}%</p>
            </div>
          </div>
          <div className="border space-y-2 border-gray rounded-md p-6">
            <div className="flex mb-4 justify-between items-center">
              <h4>المبيعات المكتسبة </h4>
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
            <b className="text-xl">${myData?.customerSalesMoney}</b>
            <div className="flex gap-2 text-[gray]">
              <p>عدد مرات البيع : {myData?.customerSales}</p>
            </div>
          </div>
          <div className="border space-y-2 border-gray rounded-md p-6">
            <div className="flex mb-4 justify-between items-center">
              <h4>عدد المبيعات</h4>
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
            <b className="text-xl">{myData?.mySales}</b>
          </div>
        </div>
        <div className="items-center flex-wrap flex justify-between">
          {myData?.invitor?._id && (
            <p className="text-xs">
              تمت {myLog ? "دعوتك" : "دعوته"} بواسطه : {myData?.invitor?.email}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-center text-xl">
            المبيعات المباشرة
          </h2>

          <SalesTable data={myData?.direct_transactions} />
        </div>
        {(data.role === "marketer" || data.role === "admin") && (
          <>
            <div className="space-y-4 py-4 my-4 border-t border-t-[gray]">
              <h2 className="font-semibold text-center text-xl">
                ارباحي من العملاء
              </h2>

              <SalesTable
                data={myData?.cutomerProfitsTransactions}
                isCustomer={true}
              />
            </div>
            <div className="space-y-4 py-4 my-4 border-y border-y-[gray]">
              <h2 className="font-semibold text-center text-xl">
                الأرباح من الفريق{" "}
              </h2>

              <SalesTable data={myData?.transactions} haveGeneration={true} />
            </div>
          </>
        )}

        <div className="space-y-4">
          <h2 className="font-semibold text-center text-xl">الفواتير </h2>

          <InvoicesTable getData={getData} data={myData?.invoices} />
        </div>
        {myLog && (data.role === "marketer" || data.role === "admin") && (
          <Link
            to={"/marketing/team"}
            className="space-x-2 block w-fit mx-auto px-6 py-3 border border-gold rounded-xl text-gold font-semibold text-lg my-4"
          >
            عرض فريقي
          </Link>
        )}
      </div>
      {data.role === "customer" && myLog && <MarketingForm />}
    </>
  );
};

export default Marketing;
