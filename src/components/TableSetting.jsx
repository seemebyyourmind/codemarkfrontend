
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Table = ({ rows, deleteRow,url1,url2, fields }) => {
  // Tạo tiêu đề của bảng dựa trên danh sách các trường
  const headers = fields.map((field, index) => (
    <th key={index} className="py-4 px-4 font-medium text-black dark:text-white">
      {field}
    </th>
  ));

  return (
    <div className="max-w-full overflow-x-auto table-wrapper">
      <table className="table">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {headers}
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
        {rows ? (
            rows.map((row, idx) => (
              <tr key={idx} className="content-center">
                {fields.map((field, index) => (
                  <td key={index} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {row[field]}
                  </td>
                ))}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="actions flex grid-cols-2 gap-4">
                    <BsFillTrashFill
                      className="delete-btn cursor-pointer"
                      onClick={() => deleteRow(row[fields[0]])}
                    />
                      <Link to={`${url1}${row[fields[0]]}`} className="edit-btn cursor-pointer">
                      <BsFillPencilFill />
                    </Link>
                    <Link to={`${url2}${row[fields[0]]}`} className="detail-btn cursor-pointer">
                      <FaEye />
                    </Link>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 1} className="py-4 px-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
