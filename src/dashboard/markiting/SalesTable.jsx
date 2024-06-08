const SalesTable = ({ data, haveGeneration, isCustomer }) => {
  if (isCustomer) {
    return (
      <div className="max-w-full overflow-auto w-full">
        <table className="text-center w-full my-6">
          <thead>
            <tr>
              <th className=" border border-gray p-2">الربح</th>
              <th className=" border border-gray p-2">النسبة</th>
              <th className=" border border-gray p-2">المستوي</th>

              <th className=" border border-gray p-2">ايميل العميل</th>
              <th className=" border border-gray p-2">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td className=" border border-gray p-2">${item.amount}</td>
                <td className=" border border-gray p-2">%{item.percentage}</td>
                <td className=" border border-gray p-2">{item.generation}</td>

                <td className=" border border-gray p-2">
                  {item.customer.email}
                </td>

                <td className=" border border-gray p-2">
                  {new Date(item.Date).toLocaleDateString()}
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
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="max-w-full overflow-auto w-full">
        <table className="text-center w-full my-6">
          <thead>
            <tr>
              <th className=" border border-gray p-2">المبلغ</th>
              {haveGeneration ? (
                <th className=" border border-gray p-2">العضو</th>
              ) : (
                <th className=" border border-gray p-2">ايميل المشتري</th>
              )}
              {haveGeneration && (
                <th className=" border border-gray p-2">المستوي</th>
              )}
              <th className=" border border-gray p-2">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td className=" border border-gray p-2">${item.amount}</td>
                <td className=" border border-gray p-2">{item.childEmail}</td>
                {haveGeneration && (
                  <td className=" border border-gray p-2">{item.generation}</td>
                )}
                <td className=" border border-gray p-2">
                  {new Date(item.Date).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td className=" border border-gray p-2">-</td>
                <td className=" border border-gray p-2">-</td>
                {haveGeneration && (
                  <td className=" border border-gray p-2">-</td>
                )}
                <td className=" border border-gray p-2">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
};

export default SalesTable;
