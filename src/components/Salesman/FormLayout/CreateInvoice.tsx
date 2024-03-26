import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../Forms/SelectGroup/SelectGroupOne';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import { Formik, Field, Form, ErrorMessage,FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from '../../FormElements/InputFiled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import SelectField from '../../FormElements/SelectField';
import CheckboxOne from '../../Checkboxes/CheckboxOne';
import TextField from '../../FormElements/TextFiled';
import InputFileUpload from '../../FormElements/InputFileUpload';
import Cookies from 'js-cookie';
import Succeed from '../Modal/Succeed';
import { useState } from 'react';


type CustomerFormValuesType = {
  id: string;
  firstName: string;
  lastName: string;
  nicNo: string;
  brid: string;
  email: string;
  address: string;
  contact: string;
  package: string;
  payment: string;
  customerNo: string;
  customerName:string;
  agentNo:string;
  nicDoc: File | null;
  brDoc: File | null;
  otherDoc: File | null;
};


function CreateInvoice({ userRole }: { userRole: string }) {

  const [showSucceedModal, setShowSucceedModal] = useState(false);
  const navigate = useNavigate();

  const CustomerRegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    nicNo: Yup.string().required("Required"),
    brid: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    package: Yup.string().required("Required"),
    payment: Yup.string().required("Required"),
    contact: Yup.string()
    .min(10, "must include a valid mobile number")
    .matches(/[0-9]/, "must includes only digits")
    .required("Required"),
    
  });

const [ loading, setLoading ] = useState(false);

  const findCustomer =async (values: any, setValues) => {
    console.log(values.contact);
    let phoneNo = values.contact;

    // Extract the JWT token from local storage
    const jwtToken = Cookies.get('jwtToken');

    // Construct the headers object with the bearer token
    const headers = {
      'Authorization': `Bearer ${jwtToken}`,
    };

        // Make an HTTP GET request to the endpoint with the phone number and headers
    const response = await fetch(`http://localhost:5001/api/customers/findbyPhone/${phoneNo}`, {
        method: 'GET',
        headers: headers
    });

    // Check if the request was successful
    if (response.ok) {
        // Parse the response body as JSON
        const data = await response.json();
        console.log('Customer data:', data);
        const customer = data[0]; // Assuming you want the first customer if multiple found
        setValues({
          ...values,
          id:customer._id,
          firstName: customer.firstname,
          lastName: customer.lastname,
          email: customer.email,
          address: customer.address,
          customerNo:customer.customerNo,
          agentNo: customer.agentNo
          // Update other fields similarly if needed
        });
    } else if (response.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized!'); // You can add additional handling if needed
    } else {
        // Handle other error responses
        console.error('Error:', response.statusText);
    }
    
  }

  const handleRegister = async (values: any): Promise<void> => {
    console.log(values.id);
    
    try {
      // Extract the JWT token from local storage
      const jwtToken = Cookies.get('jwtToken');
  
      // Construct the headers object with the bearer token
      const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json', // Make sure to set the content type
      };
  
      // Construct the payload
      const payload = {
        customerName: values.firstName + " " + values.lastName,
        customerId: values.id,
        paymentType: values.payment,
        package: values.package,
        startupFee: "2990",
        customerNo:values.customerNo,
        agentNo:values.agentNo
      };
      console.log(payload);
      
      // Make the HTTP POST request to the endpoint
      const response = await fetch('http://localhost:5001/api/invoices/create', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
  
      // Handle response status
      if (response.ok) {
        console.log('Invoice created successfully!');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error: any) { // Explicitly type 'error' as 'any' or 'Error'
      console.error('Error:', error.message); // Fix typo here
    }
    console.log(values);
  };
  
  


  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };



  return (
    <DefaultAdminLayout userRole={userRole}>
      <Breadcrumb pageName="Invoice Creation Form" />

      <div className="w-full gap-9 sm:grid-cols-2 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Customer Regsitration Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark w-full">
              <h3 className="font-medium text-black dark:text-white">
                Please fill all the details
                
              </h3>
            </div>
            <div className="p-6.5">
              <Formik
                initialValues={{
                  id:"",
                  firstName: "",
                  lastName: "",
                  nicNo: "",
                  brid: "",
                  email: "",
                  address: "",
                  contact: "",
                  package: "",
                  payment:"",
                  nicDoc: null,  // Add these lines
                  brDoc: null,
                  otherDoc : null,
                }}
                validationSchema={CustomerRegistrationSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange,values, setValues, }) => (

                  <Form className=" w-full">

                <div className='w-full md:w-1/2 flex flex-row justify-start space-x-2 items-end'>
                  <div className='w-2/3'>
                  <InputField
                        label="Search Mobile Number"
                        name="contact"
                        type="text"
                        boxcolor="transparent"
                        placeholder="Contact"
                        handleChange={handleChange}
                        values={values}
                        icon="LocalPhone"
                      />
                  </div>
               
                  <div className='w-1/4'>
                  <PrimaryButton
                        type="button"
                        // eventname={handleRegister}
                        onClick={() => findCustomer(values, setValues)}
                        bgcolor='#a855f7'
                        textcolor="#fafafa"
                        label="Search"
                        
                      />
                  </div>

                


                </div>

                <p className='text-red-600 text-[12px] mt-1'>User Not Found</p>



                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3 '>
                      <InputField
                        label="First Name"
                        name="firstName"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder="First Name"
                        handleChange={handleChange}
                        values={values}
                        disabled={true}
                      />
                      <InputField
                        label="Last Name"
                        name="lastName"
                        type="text"
                        boxcolor="transparent"
                        placeholder="Last Name"
                        handleChange={handleChange}
                        values={values}
                        icon="AccountCircle"
                        disabled={true}
                      />
                    </div>



                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3 '>
                      <InputField
                        label="Email"
                        name="email"
                        type="text"
                        boxcolor="transparent"
                        placeholder="Email"
                        handleChange={handleChange}
                        values={values}
                        icon="AlternateEmail"
                        disabled={true}
                      />
                      
                      <InputField
                      label="Address"
                      name="address"
                      type="text"
                      boxcolor="transparent"
                      placeholder="Address"
                      handleChange={handleChange}
                      values={values}
                      disabled={true}
                      icon="Map"
                    />
                    </div>

                    



                    <div className='w-full py-3 mt-5'>
                      <h2>Package Details</h2>
                    </div>
                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3 '>

                      <SelectField
                        label="Select a Package"
                        name='package'
                        icon="Inventory"
                        boxcolor="transparent"
                        handleChange={handleChange}
                        options={["Basic", "Platinum", "Premium"]}
                        values={values}
                      />

                     
                        <CheckboxOne
                          type='checkbox'
                          name="Select Startup fee"
                          label='Select Startup fee'
                          boxcolor="transparent"
                          icon="Inventory" />
                     


                    </div>



                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3 '>

                      <SelectField
                        label="Select a Payment Method"
                        name='payment'
                        icon="Payments"
                        boxcolor="transparent"
                        handleChange={handleChange}
                        options={["Direct Purchase", "Bank Deposit", "Cheque"]}
                        values={values}
                      />

                     
                       


                    </div>



                    



                    <div className='w-full md:w-1/3 flex flex-row justify-between space-x-3'>
                      <PrimaryButton
                        type="button"

                        textcolor="dark:text-[#fafafa]"
                        label="Clear From"
                        colorfrom='transparent'
                        colorto='transparent'
                      />

                      <PrimaryButton
                        type="submit"
                        onClick={() => handleRegister(values)}
                        
                        textcolor="#fafafa"
                        label="Place Invoice"
                        colorfrom='#c026d3'
                        colorto='#a855f7'
                      />
                    </div>
                    {loading && 

<div className='w-full mt-2 text-center'>
<p className='text-[12px]'>Please wait...</p>
</div>


}

                  </Form>

                )}




              </Formik>
            </div>
          </div>
        </div>

        <Succeed isOpen={showSucceedModal} onClose={handleCloseModal} />
      </div>
    </DefaultAdminLayout>
  )
}

export default CreateInvoice
function resetForm() {
  throw new Error('Function not implemented.');
}

