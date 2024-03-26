import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import PDInvoiceEdit from "../Modal/PDInvoiceEdit";
import axios from "axios";


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


interface TableProps {
  tablehead: string[];
}

interface CheckedRows {
  [key: number]: boolean;
  all?: boolean;
}


const downloadSampleImage = async (invoiceNo: string, _id: string) => {
  try {
    // Make GET request to the API endpoint
    console.log('Pending Invoice Data Item:',invoiceNo)
    const response = await axios.get(`http://localhost:5001/api/invoices/${_id}`);

    // Log the response values
    console.log('Response:', response.data);

    // Extract the file name from the proofDocs field
    const proofDocsFileName = response.data.proofDocs.split('\\').pop();

    // Log the extracted file name
    console.log('Proof Docs File Name:', proofDocsFileName);

    // Construct the download URL for the file
    const downloadUrl = `http://localhost:5001/api/customers/download/${proofDocsFileName}`;

    // Trigger download of the file from the download URL
    saveAs(downloadUrl, proofDocsFileName);
  } catch (error) {
    console.error('Error:', error);
  }
};



const InvoiceTableAdminPDTemp = ({ tablehead }: TableProps) => {

  const [pendingInvoiceData , setPendingInvoiceData ] = useState<pendingInvoiceData[]>([]);
  const [selectedPDInvoice, setSelectedPDInvoice] = useState<pendingInvoiceData | null>(null);
  const [checkedRows, setCheckedRows] = useState<CheckedRows>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(pendingInvoiceData);

  const handleHeaderCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedCheckedRows: CheckedRows = {};

    pendingInvoiceData.forEach((pendingInvoiceDataItem, key) => {
      updatedCheckedRows[key] = isChecked;
    });

    updatedCheckedRows.all = isChecked;

    setCheckedRows(updatedCheckedRows);
  };

  const handleRowCheckboxChange = (key: number) => async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const filteredData = response.data.filter((invoice: pendingInvoiceData) => invoice.status !== 'Accept' && invoice.status !== 'Reject');
      // Format createdAt for each invoice
      const formattedData = filteredData.map((invoice: pendingInvoiceData) => ({
        ...invoice,
        createdAt: formatCreatedAt(invoice.createdAt),
      }));
      // Set the filtered and formatted data into the invoices state variable
      setPendingInvoiceData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    const formattedDate = `${date.toISOString().split('T')[0]} @ ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return formattedDate;
  };


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data based on the search query
    const newFilteredData = pendingInvoiceData.filter(
      (item) =>
        item.agentNo.toLowerCase().includes(query) ||
        item.customerNo.toLowerCase().includes(query)
    );
    setPendingInvoiceData(newFilteredData);
  };




  const handleDownload = () => {
    // Filter out unchecked rows
    const selectedRows = pendingInvoiceData.filter((_, key) => checkedRows[key]);

    // Create CSV content
    const csvContent =
      selectedRows.map(row => Object.values(row).join(",")).join("\n");

    // Convert CSV content to Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Trigger download
    saveAs(blob, "selected_data.csv");
  };




  const handleEdit = (pendingInvoiceDataItem: pendingInvoiceData) => {
    setSelectedPDInvoice(pendingInvoiceDataItem);
  };




  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className="w-full flex justify-start items-end mb-3">
        <div className="md:w-1/4 w-1/2 flex flex-row justify-center items-center">
          <input type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="search-keyword w-full md:h-[44px] h-[32px] px-2 outline-none rounded-md text-[12px] md:text-[14px] text-boxdark"
            placeholder="Search AgentID,customerID,InoiceID..."
          />
        </div>

      </div>



      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11 min-w-[10px]">


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



            {pendingInvoiceData
              .map((pendingInvoiceDataItem, key) => {


                let statusColor = '';
                if (pendingInvoiceDataItem.status === 'Accept') {
                  statusColor = 'green-600';
                } else if (pendingInvoiceDataItem.status === "Pending") {
                  statusColor = 'red-600';
                }

                return (

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
                        {pendingInvoiceDataItem.agentNo}
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
                        {pendingInvoiceDataItem.paymentType}
                      </h5>



                    </td>




                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                      <div className="w-full rounded-md px-4 py-2 flex justify-center items-center dark:bg-white bg-slate-100">
                        <h5 className={`font-medium text-[14px] text-${statusColor}`}>
                          {pendingInvoiceDataItem.status}
                        </h5>
                      </div>


                    </td>


                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                      <div className="flex items-center space-x-3.5">



                        <svg className="w-6 h-6 cursor-pointer " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                          onClick={() => downloadSampleImage(pendingInvoiceDataItem.invoiceNo, pendingInvoiceDataItem._id)}
                        >
                          <path className='fill-black dark:fill-white ' d="M24 12a5 5 0 0 1-5 5h-2v-1h2a3.99 3.99 0 0 0 .623-7.934l-.79-.124-.052-.798a5.293 5.293 0 0 0-10.214-1.57L8.17 6.59l-.977-.483A2.277 2.277 0 0 0 6.19 5.87a2.18 2.18 0 0 0-1.167.339 2.206 2.206 0 0 0-.98 1.395l-.113.505-.476.2A4 4 0 0 0 5 16h3v1H5a5 5 0 0 1-1.934-9.611 3.21 3.21 0 0 1 1.422-2.025 3.17 3.17 0 0 1 1.702-.493 3.268 3.268 0 0 1 1.446.34 6.293 6.293 0 0 1 12.143 1.867A4.988 4.988 0 0 1 24 12zm-11-1h-1v10.292l-2.646-2.646-.707.707 3.854 3.854 3.853-3.852-.707-.707L13 21.294z" />
                          <path fill="none" d="M0 0h24v24H0z" />
                        </svg>

                        <button className="px-4 py-2 rounded-md  bg-purple-700 text-white text-[12px] md:text-[14px]"
                        
                        onClick={() => handleEdit(pendingInvoiceDataItem)}
                        
                        >Invoice Confirmation</button>
                      </div>
                    </td>





                  </tr>
                );


              })}
          </tbody>
        </table>



        {selectedPDInvoice && (
      <PDInvoiceEdit
        pendingInvoiceDataItem={selectedPDInvoice}
        onClose={() => setSelectedPDInvoice(null)}
      />
    )}


      </div>
    </div>
  );
};

export default InvoiceTableAdminPDTemp;

















