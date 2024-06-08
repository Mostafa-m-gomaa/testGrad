import { useContext, useState } from "react";
import { AppContext, route } from "../../App";
import toast from "react-hot-toast";
import axios from "axios";

const InvoicesTable = ({ data, getData }) => {
  const token = localStorage.getItem("token");
  const { setLoading } = useContext(AppContext);
  const [reqInvoice, setReqInvoice] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const sendRequest = function (e) {
    e.preventDefault();

    setLoading(true);
    axios
      .post(
        `${route}withdrawReq`,
        JSON.stringify({
          paymentMethod,
          recieverAcc: email,
          invoiceId: reqInvoice._id,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast.success("Done");
        setReqInvoice({});
        getData();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {reqInvoice?._id && (
        <div className="fixed w-full h-full right-0 top-0 bg-[black] bg-opacity-75 flex items-center justify-center">
          <div className="bg-blackGold p-6 rounded-xl">
            {" "}
            <div className="font-semibold text-xl flex items-center justify-between mb-4">
              <h2>إتمام طلب السحب</h2>
              <button onClick={() => setReqInvoice({})}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => sendRequest(e)}>
              <div className="space-y-2 ">
                <label>طريقه الحصول علي العمولات :</label>
                <select
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className=" w-full py-2 bg-blackGold border border-goldenGray px-6  rounded-md"
                >
                  <option value="" disabled selected></option>
                  <option value="wise">wise</option>
                  <option value="crypto">crypto</option>
                </select>
              </div>
              {paymentMethod && (
                <div className="space-y-2">
                  <label>
                    {paymentMethod === "crypto" && "عنوان المحفظه"}
                    {paymentMethod === "wise" && "البريد الالكتروني"} :
                  </label>
                  <input
                    type="text"
                    placeholder="example"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className=" w-full py-2 bg-blackGold border border-goldenGray px-6  rounded-md"
                  />
                </div>
              )}

              <button
                type="submit"
                className="font-semibold text-blackGold bg-gold px-10 py-2 rounded-xl mx-auto block w-fit"
              >
                سجل
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-full overflow-auto w-full">
        <table className="text-center w-full my-6">
          <thead>
            <tr>
              <th className=" border border-gray p-2">اجمالي مبلغ المبيعات</th>
              <th className=" border border-gray p-2">المبيعات المباشره</th>
              <th className=" border border-gray p-2">مبيعات المكتسبة</th>
              <th className=" border border-gray p-2">النسبة</th>
              <th className=" border border-gray p-2">الأرباح</th>
              <th className=" border border-gray p-2">ارباح الشجره</th>
              <th className=" border border-gray p-2">الأرباح من العملاء</th>
              <th className=" border border-gray p-2">الارباح الكلية</th>
              <th className=" border border-gray p-2">حالة الفاتوره</th>
              <th className=" border border-gray p-2">التاريخ</th>
              <th className=" border border-gray p-2">تاريخ الدفع</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td className=" border border-gray p-2">
                  ${item.totalSalesMoney}
                </td>
                <td className=" border border-gray p-2">{item.mySales}</td>
                <td className=" border border-gray p-2">
                  {item.customerSales}
                </td>
                <td className=" border border-gray p-2">%{item.percentage}</td>
                <td className=" border border-gray p-2">
                  ${item.direct_profits}
                </td>
                <td className=" border border-gray p-2">
                  ${item.tree_profits}
                </td>
                <td className=" border border-gray p-2">
                  ${item.customers_profits}
                </td>
                <td className=" border border-gray p-2">
                  $
                  {item.tree_profits +
                    item.direct_profits +
                    item?.customers_profits}
                </td>
                <td className=" border border-gray p-2 whitespace-nowrap">
                  {item.status === "paid" && "تم الدفع"}
                  {item.status === "pending" && "يتم المراجعة"}
                  {item.status === "rejected" && "مرفوض"}
                  {item.status === "unpaid" && (
                    <button onClick={() => setReqInvoice(item)}>
                      اطلب الدفع
                    </button>
                  )}
                </td>

                <td className=" border border-gray p-2">
                  {new Date(item.Date).toLocaleDateString()}
                </td>
                <td className=" border border-gray p-2">
                  {item?.paidAt ? (
                    <>{new Date(item.paidAt).toLocaleDateString()}</>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2 whitespace-nowrap">-</td>

                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoicesTable;
