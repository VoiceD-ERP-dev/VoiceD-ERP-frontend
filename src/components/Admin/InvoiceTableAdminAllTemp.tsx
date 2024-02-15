import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const customerData = [
  {
    salesagent: "VDS-00089S24",
    customerid: "Reg-00078C24",
    firstname: "Nissanka",
    lastname: "Konara",
    nic: "199863525569",
    brid: "PPY890NB60",
    organization: "Gagana Holdings",
    registeredon: "02/Feb/2024",
    contactno: "0778484888",
    email: "nissanka@gmail.com",
    address: "No 23/1, Highlevel Road, Kottawa"
  },

];

interface TableProps {
  tablehead: string[];
}

interface CheckedRows {
  [key: number]: boolean;
  all?: boolean;
}



const InvoiceTableAdminAllTemp = ({ tablehead }: TableProps) => {











  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">

              {tablehead.map((tableh, index) => (
                <th
                  key={index}
                  className={`py-4 px-4 font-medium text-black dark:text-white xl:pl-11 min-w-[220px]`}
                >
                  {tableh}
                </th>
              ))}
            </tr>
          </thead>


          <tbody>


            {customerData.map((customerDataItem, index) => {

              // const [statusColor, setStatusColor] = useState('green-600');

              // useEffect(() => {
              //   if (customerDataItem.status === 'Completed') {
              //     setStatusColor('green-600');
              //   } else if (customerDataItem.status === 'Pending') {
              //     setStatusColor('red-600');
              //   }
              // }, [customerDataItem.status]);

              return (

                <tr key={index}>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.salesagent}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.customerid}
                    </h5>

                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.firstname}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.lastname}
                    </h5>

                  </td>




                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.nic}
                    </h5>

                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.brid}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.contactno}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.email}
                    </h5>

                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.address}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white">
                      {customerDataItem.registeredon}
                    </h5>

                  </td>




                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-normal text-black dark:text-white text-[14px]">
                      <button>Edit</button>
                    </h5>

                  </td>












                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTableAdmin;

















