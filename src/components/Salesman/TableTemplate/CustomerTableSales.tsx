import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import Cookies from 'js-cookie';

interface CustomerData {

  customerNo: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  phone: string;

}
const getCookie = (name: string) => {
  return Cookies.get(name);
}

interface TableProps {
  tablehead: string[];
}

interface CheckedRows {
  [key: number]: boolean;
  all?: boolean;
}



const CustomerTableSales = ({ tablehead }: TableProps) => {

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

  const handleEdit = (customerDataItem: CustomerData) => {
    setSelectedCustomer(customerDataItem);
  }

  const fetchCustomers = async () => {
    try {
      // Retrieve the JWT token from the cookie
      const token = getCookie('jwtToken');

      // Set the request headers with the JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Make the GET request with the token included in the headers
      const response = await axios.get<CustomerData[]>('http://localhost:5001/api/customers/cv', {
        headers: headers,
      });
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



return(

<tr key={index}>
                

                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    CLI{customerDataItem.customerNo}
                  </h5>

                 </td>

                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {customerDataItem.firstname} {customerDataItem.lastname}
                  </h5>

                 </td>


                 


                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {customerDataItem.createdAt}
                  </h5>

                 </td>

                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 ">
                  <h5 className="font-medium text-black dark:text-white">
                    {customerDataItem.phone}
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

export default CustomerTableSales;

















