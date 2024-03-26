import React, { useState } from "react";
import { saveAs } from "file-saver";
import ClosedOrderEdit from "../Modal/ClosedOrderEdit";
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JSZip from 'jszip';

interface OrderData {
  orderNo: string;
  invoiceId: string;
  packageType: string;
  orderStatus: string;
}

interface TableProps {
  tablehead: string[];
}

const ClosedOrderTableAdmin = ({ tablehead }: TableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  // Demo data for orders
  const demoOrderData: OrderData[] = [
    {
      orderNo: "000001",
      invoiceId: "INV0001",
      packageType: "Basic",
      orderStatus: "Pending"
    },
    {
      orderNo: "000002",
      invoiceId: "INV0002",
      packageType: "Premium",
      orderStatus: "Completed"
    },
    // Add more demo data as needed
  ];

  const downloadDocs = (phone: string, firstName: string, lastName: string) => {
    const zip = new JSZip();
    // Add mock files to the zip
    zip.file('MockFile1.txt', 'This is a mock file content.');
    zip.file('MockFile2.txt', 'This is another mock file content.');

    // Generate the zip file asynchronously
    zip.generateAsync({ type: 'blob' })
      .then(blob => {
        // Trigger download of the zip file
        saveAs(blob, `${firstName} ${lastName} - OrderDocs.zip`);
      })
      .catch(error => {
        console.error('Error generating zip file:', error);
      });
  };

  const handleEdit = (order: OrderData) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {tablehead.map((header, index) => (
                  <th key={index} className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11 min-w-[220px] text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demoOrderData.map((order, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">{order.orderNo}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">{order.invoiceId}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">{order.packageType}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">{order.orderStatus}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <div className="flex flex-row space-x-2 justify-center items-center">
                      <h5 className="font-normal text-[#161616] dark:text-white text-[14px] md:text-[24px]">
                        <FontAwesomeIcon
                          className="hover:text-[#a855f7] cursor-pointer"
                          icon={faCloudArrowDown}
                          onClick={() => downloadDocs(order.phone, order.firstname, order.lastname)}
                        />
                      </h5>
                      <button
                        className="px-4 py-2 rounded-md hover:bg-[#c281ff] bg-[#a855f7] text-[#fafafa]"
                        onClick={() => handleEdit(order)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && <OrderEdit orderData={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </>
  );
};

export default ClosedOrderTableAdmin;
