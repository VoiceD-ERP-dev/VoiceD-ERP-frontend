import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";

const customerData = [
  {
    customerid: "Reg-00078C24",
    name: "Nissanka Konara",
    registeredon: "02/Feb/2024",
    invoiceid: "VDG000001/24",
    orderStatus: "Order Placed",
  },
  {
    customerid: "Reg-00080C24",
    name: "Asela Pradeepan",
    registeredon: "11/Feb/2024",
    invoiceid: "VDG000003/24",
    orderStatus: "Order not Placed",
  },
  {
    customerid: "Reg-00092C24",
    name: "Kasuni Jayathilake",
    registeredon: "08/Feb/2024",
    invoiceid: "VDG000005/24",
    orderStatus: "Order Placed",
  }
];

interface TableProps {
  tablehead: string[];
}

interface CheckedRows {
  [key: number]: boolean;
  all?: boolean;
}


interface pendingInvoiceData {
  customerNo: string;
  customerName: string;
  createdAt: string;
  invoiceNo: string;
  status: string;
  paymentType: string;
  agentNo: string;
  _id:string;
}
const InvoiceTableAdminAcceptTemp = ({ tablehead }: TableProps) => {


  const [invoices, setInvoices] = useState<pendingInvoiceData[]>([]);
  const [checkedRows, setCheckedRows] = useState<CheckedRows>({});

  const handleHeaderCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedCheckedRows: CheckedRows = {};

    customerData.forEach((customerDataItem, key) => {
      updatedCheckedRows[key] = isChecked;
    });

    updatedCheckedRows.all = isChecked;

    setCheckedRows(updatedCheckedRows);
  };

  const handleRowCheckboxChange = (key: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [key]: isChecked,
      all: false, // Uncheck "Select All" if an individual row is unchecked
    }));

    const allChecked = Object.values({ ...prevCheckedRows, [key]: isChecked }).every(Boolean);

    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      all: allChecked,
    }));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);
  
  
  const fetchInvoices = async () => {
    try {
      const response = await axios.get<pendingInvoiceData[]>('http://localhost:5001/api/invoices/all');
      console.log('Response from the server:', response.data);
      // Filter the data with status equal to "Pending"
      const filteredData = response.data.filter((invoice: pendingInvoiceData) => invoice.status === 'Accept');
      // Format createdAt for each invoice
      const formattedData = filteredData.map((invoice: pendingInvoiceData) => ({
        ...invoice,
        createdAt: formatCreatedAt(invoice.createdAt),
      }));
      // Set the filtered and formatted data into the invoices state variable
      setInvoices(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    const formattedDate = `${date.toISOString().split('T')[0]} @ ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return formattedDate;
  };

  const handleDownload = () => {
    // Filter out unchecked rows
    const selectedRows = customerData.filter((_, key) => checkedRows[key]);

    // Create CSV content
    const csvContent =
  selectedRows.map(row => Object.values(row).join(",")).join("\n");

    // Convert CSV content to Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Trigger download
    saveAs(blob, "selected_data.csv");
  };



  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11 min-w-[80px]">
              
              <div className="flex flex-row space-x-2">
              <input
                  type="checkbox"
                  checked={checkedRows.all || false}
                  onChange={handleHeaderCheckboxChange}
                />
                <button 
                onClick={handleDownload}
                className="hover:text-primary ">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button>
              </div>
              </th>
              {tablehead.slice(1).map((tableh, index) => (
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
          {invoices
              .map((pendingInvoiceDataItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <input
                    type="checkbox"
                    checked={checkedRows[key] || false}
                    onChange={handleRowCheckboxChange(key)}
                  />
                </td>

                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                  CLI{pendingInvoiceDataItem.customerNo}
                  </h5>

                 </td>

                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {pendingInvoiceDataItem.customerName}
                  </h5>

                 </td>


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    VDDG{pendingInvoiceDataItem.invoiceNo}
                  </h5>

                 </td>


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                  {pendingInvoiceDataItem.createdAt}
                  </h5>

                 </td>


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                 <h5 className="font-medium text-black dark:text-white">
                    {pendingInvoiceDataItem.status}
                  </h5>
                </td>

                


                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTableAdminAcceptTemp;

















