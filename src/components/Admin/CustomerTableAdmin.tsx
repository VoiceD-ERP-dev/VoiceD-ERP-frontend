import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import CustomerEdit from "./Modal/CustomerEdit";
import { faClose , faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface CustomerData {
  salesagent: string;
  customerid: string;
  firstname: string;
  lastname: string;
  nic: string;
  brid: string;
  organization: string;
  registeredon: string;
  contactno: string;
  email: string;
  address: string;
}


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
    contact: "0778484888",
    email: "nissanka@gmail.com",
    address: "No 23/1, Highlevel Road, Kottawa"
  },

  {
    salesagent: "VDS-00078S24",
    customerid: "Reg-00047C24",
    firstname: "Amal",
    lastname: "Dissanayake",
    nic: "198063565582",
    brid: "PPY111NB60",
    organization: "Janahitha Mortors",
    registeredon: "08/Feb/2024",
    contact: "0777515155",
    email: "dissanayake@gmail.com",
    address: "No 59/2, Highlevel Road, Maharagama"
  },

  {
    salesagent: "VDS-00089S24",
    customerid: "Reg-00044C24",
    firstname: "Gihan",
    lastname: "Rathnayaka",
    nic: "199754858879",
    brid: "PPY425LL48",
    organization: "Blue Aqua Fish",
    registeredon: "11/Feb/2024",
    contact: "0778999986",
    email: "rathnayaka@gmail.com",
    address: "No 38/1, Highlevel Road, Nawala"
  },


];

interface TableProps {
  tablehead: string[];
}

interface CheckedRows {
  [key: number]: boolean;
  all?: boolean;
}



const CustomerTableAdmin = ({ tablehead }: TableProps) => {


  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);

  const handleEdit = (customerDataItem: CustomerData) => {
    setSelectedCustomer(customerDataItem);
  };







  return (

    <>
    
    
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
                      {customerDataItem.organization}
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
                      {customerDataItem.contact}
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
                    <h5 className="font-normal text-[#ffffff] dark:text-white text-[14px] md:text-[24px]">
                    <FontAwesomeIcon
          
          className="hover:text-[#c026d3] cursor-pointer"
          icon={faCloudArrowDown} />
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-normal text-[#ffffff] dark:text-white text-[12px] md:text-[16px]">
                    <button 
                    className="px-4 py-2 rounded-md hover:bg-[#c026d3] bg-[#a855f7]"
                    onClick={() => handleEdit(customerDataItem)}>Edit</button>
                    </h5>

                  </td>



                  














                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>



    {selectedCustomer && (
        <CustomerEdit customerData={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
      )}

    </>
  );
};

export default CustomerTableAdmin;

















