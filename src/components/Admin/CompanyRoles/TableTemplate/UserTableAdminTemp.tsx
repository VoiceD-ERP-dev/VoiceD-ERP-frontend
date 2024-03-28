import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import PrimaryButton from "../../../FormElements/PrimaryButon";
import SalesAgentEdit from "../../Modal/SalesAgentEdit";
import AddSystemUser from "../../Modal/AddSystemUser";
import axios from "axios";
import { string } from "yup";




interface salesAgentData {
  agentNo: string;
  firstname: string;
  lastname: string;
  username: string;
  contact: string;
  overallC: string;
  overallI: string;
  address: string;
  createdAt : string;
  empStatus : string;
  role:string;
  email : string;
  remLeave : string;
  otherData: {
    phone: string;
  }[];
}



const salesAgentData = [
  {
    agentNo: "SID-00078C24",
    fullName: "Nissanka Konara",
    contact: "0778484855",
    overallC: "56",
    overallI: "14",
    address: "No 13/B, Janadhipathi Mawatha, Katunayaka.",
    joindedDate : "20/Feb/2020",
    empStatus : "Retired",
    nic:"198763566695V",
    email : "Nissanka.K.Silva927@gmail.com",
    remLeave : "7",
    
  },

  
];

interface TableProps {
  tablehead: string[];
}

interface CheckedRows {
  [key: number]: boolean;
  all?: boolean;
}



const UserTableAdminTemp = ({ tablehead }: TableProps) => {



  const [checkedRows, setCheckedRows] = useState<CheckedRows>({});





  
  const handleHeaderCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedCheckedRows: CheckedRows = {};

    salesAgentData.forEach((salesAgentDataItem, key) => {
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



  const handleDownload = () => {
    // Filter out unchecked rows
    const selectedRows = salesAgentData.filter((_, key) => checkedRows[key]);

    // Create CSV content
    const csvContent =
  selectedRows.map(row => Object.values(row).join(",")).join("\n");

    // Convert CSV content to Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Trigger download
    saveAs(blob, "selected_data.csv");
  };


  

  const [isSalesAgentPopUpOpen, setSalesAgentPopUpOpen] = useState(false);
  const openSalesAgentPopUp = () => {
    setSalesAgentPopUpOpen(true);
  }
  const closeSalesAgentPopUp = () => {
    setSalesAgentPopUpOpen(false);
  }



  const [selectedAgent, setSelectedAgent] = useState<salesAgentData | null>(null);
  const [salesAgentData, setsalesAgentData] = useState<salesAgentData[]>([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get<salesAgentData[]>('http://localhost:5001/api/users/getAll');
      console.log('Response from the server:', response.data);
      const formattedData = response.data.map((agent: salesAgentData) => ({
        ...agent,
        createdAt: formatCreatedAt(agent.createdAt),
      }));
      setsalesAgentData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    const formattedDate = `${date.toISOString().split('T')[0]} @ ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return formattedDate;
  };

  const handleEdit = (salesAgentDataItem: salesAgentData) => {
    setSelectedAgent(salesAgentDataItem);
  };




  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="w-full flex justify-end items-end mb-3 space-x-3">
      <div className="md:w-1/4 w-1/2 flex flex-row justify-center items-center ">
  <select
className="w-full h-full p-2 bg-[#fafafa] outline-none text-[#1a1a1a] text-[12px] form-control form-field-input cursor-pointer"
> 
<option value="" disabled></option>
</select>
  </div>
  <div className="md:w-1/4 w-1/2 flex flex-row justify-center items-center">
  <PrimaryButton
label="Add New System User"
textcolor="#ffffff"
bgcolor="#b76bff"
type="button"
eventname={openSalesAgentPopUp}

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
            


            {salesAgentData.map((salesAgentDataItem, key) => {


              // const [statusColor, setStatusColor] = useState('green-600');

              //   useEffect(() => {
              //     if (salesAgentDataItem.empStatus === 'Retired') {
              //       setStatusColor('red-600');
              //     } else if (salesAgentDataItem.empStatus === 'Working') {
              //       setStatusColor('green-600');
              //     }
              //   }, [salesAgentDataItem.empStatus]);

              return(
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
                    {salesAgentDataItem.agentNo}
                  </h5>

                 </td>

                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.firstname} {salesAgentDataItem.lastname}
                  </h5>

                 </td>


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.username}
                  </h5>

                 </td>


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
      <h5 className="font-medium text-black dark:text-white">
        {salesAgentDataItem.otherData.length > 0 ? salesAgentDataItem.otherData[0].phone : ''}
      </h5>
    </td>


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.email}
                  </h5>

                 </td>





                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.createdAt}
                  </h5>

                 </td>




                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.overallC}
                  </h5>

                 </td>



                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.overallI}
                  </h5>

                 </td>



                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.remLeave}
                  </h5>

                 </td>


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {salesAgentDataItem.role}
                  </h5>

                 </td>






                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-normal text-[#ffffff] dark:text-white text-[12px] md:text-[16px]">
                    <button 
                    className="px-4 py-2 rounded-md hover:bg-[#c026d3] bg-[#a855f7]"
                    onClick={() => handleEdit(salesAgentDataItem)}>Edit</button>
                    </h5>

                  </td>

                


                
              </tr>

              );
            })}
          </tbody>
        </table>
      </div>

      {isSalesAgentPopUpOpen && (
          <AddSystemUser onClose={closeSalesAgentPopUp} />
        )}


{selectedAgent && (
        <SalesAgentEdit salesAgentData={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}



    </div>
  );
};

export default UserTableAdminTemp;

















