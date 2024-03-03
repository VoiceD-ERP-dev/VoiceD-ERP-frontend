import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import CustomerEdit from "../Modal/CustomerEdit";
import { faClose , faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";


interface CustomerData {
  salesman: string;
  _id: string;
  firstname: string;
  lastname: string;
  nicNo: string;
  brId: string;
  createdAt: string;
  phone: string;
  email: string;
  address: string;
  otherDoc: string[];
  brDoc: string[];
  nicDoc: string[];
}







interface TableProps {
  tablehead: string[];
}

interface CheckedRows {
  [key: number]: boolean;
  all?: boolean;
}



const CustomerTableAdmin = ({ tablehead }: TableProps) => {


  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get<CustomerData[]>('http://localhost:5001/api/customers/all');
      console.log('Response from the server:', response.data);
      const formattedData = response.data.map((customer: CustomerData) => ({
        ...customer,
        createdAt: formatCreatedAt(customer.createdAt),
      }));
      setCustomerData(formattedData);
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
                  className={`py-4 px-4 font-medium text-black dark:text-white xl:pl-11 min-w-[220px] text-center`}
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
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.salesman}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem._id}
                    </h5>

                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.firstname}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.lastname}
                    </h5>

                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.nicNo}
                    </h5>

                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.brId}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.phone}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.email}
                    </h5>

                  </td>


                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.address}
                    </h5>

                  </td>



                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.createdAt}
                    </h5>

                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white text-center">
                      {customerDataItem.nicDoc.length > 0 && "NIC "}
                      {customerDataItem.brDoc.length > 0 && ", Br "}
                      {customerDataItem.otherDoc.length > 0 && ", Other "}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <div className="w-full rounded-md px-4 py-2 flex justify-center items-center dark:bg-white bg-slate-100">
                  <h5 className={`font-medium text-[14px] text-green-600` }>
                    Active
                  </h5>
                  </div>
              

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

















