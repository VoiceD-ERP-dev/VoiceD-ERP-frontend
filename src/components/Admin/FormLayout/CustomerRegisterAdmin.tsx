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
  firstName: string;
  lastName: string;
  nicNo: string;
  brid: string;
  email: string;
  address: string;
  contact: string;
  package: string;
  payment: string;
  nicDoc: File | null;
  brDoc: File | null;
  otherDoc: File | null;
};


function CustomerRegisterAdmin({ userRole }: { userRole: string }) {

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

  const handleRegister = async (values: CustomerFormValuesType, { resetForm }: FormikHelpers<CustomerFormValuesType>): Promise<void> => {
    try {

      setLoading(true);
      // Extract the JWT token from local storage
      const jwtToken = Cookies.get('jwtToken');
  
      // Construct the headers object with the bearer token
      const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        
      };
  
      // Construct the registration data object
      const registrationData = new FormData();
      registrationData.append('firstname', values.firstName || "John");
      registrationData.append('lastname', values.lastName || "Doe");
      registrationData.append('nicNo', values.nicNo || "123456789");
      registrationData.append('brId', values.brid || "234");
      registrationData.append('email', values.email || "shanbasnayake98@gmail.com");
      registrationData.append('phone', values.contact || "1234567890");
      registrationData.append('address', values.address || "123 Main Street, City");
      registrationData.append('invoice[0][paymentType]', values.payment || "Card");
      registrationData.append('invoice[0][order][description]', "Order for invoice for A");
      registrationData.append('invoice[0][package][package]', values.package || "Basic");
      registrationData.append('invoice[0][package][startupFee]', "2990");
  
      // Append files to the formData if they are not null
      if (values.nicDoc !== null) {
        registrationData.append('nicDoc', values.nicDoc);
      }
  
      if (values.brDoc !== null) {
        registrationData.append('brDoc', values.brDoc);
      }


      if (values.otherDoc !== null) {
        registrationData.append('otherDoc', values.otherDoc);
      }
      


      // Make an HTTP POST request to the endpoint with the registration data and headers
      const response = await fetch('https://voiced-erp-backend.onrender.com/api/customers/cv', {
        method: 'POST',
        headers: headers,
        body: registrationData
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Log success message or handle success response
        console.log('Registration successful!');
        // Open the Succeed modal
        setShowSucceedModal(true);
      } else if (response.status === 401) {
        // Redirect to SignIn.tsx if unauthorized
        console.error('Unauthorized! Redirecting to sign-in page...');
        navigate('/'); // Assuming 'navigate' is a function from react-router-dom
    
      } else {
        // Handle error response
        console.error('Registration failed:', response.statusText);
      }
      setLoading(false);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
    console.log(values);
  };



  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };



  return (
    <DefaultAdminLayout userRole={userRole}>
      <Breadcrumb pageName="Customer Registration Form" />

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



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">


<div className='w-full '>
                      <h2>Self Regsitration Portal</h2>
                    </div>

                    <TextField 
                        label=""
                        name="portal"
                        type="text"
                        icon="AddLink"
                        boxcolor="transparent"
                        placeholder="voiced.lk/sid=?9076RtHYU6764/csr"
                       
                        
                      />



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
                      />
                    </div>


                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3 '>
                      <InputField
                        label="NIC"
                        name="nicNo"
                        type="text"
                        boxcolor="transparent"
                        placeholder="NIC"
                        handleChange={handleChange}
                        values={values}
                        icon="ContactMail"
                      />
                      <InputField
                        label="BR ID"
                        name="brid"
                        type="text"
                        boxcolor="transparent"
                        placeholder="BR ID"
                        handleChange={handleChange}
                        values={values}
                        icon="Nfc"
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
                      />
                      <InputField
                        label="Contact"
                        name="contact"
                        type="text"
                        boxcolor="transparent"
                        placeholder="Contact"
                        handleChange={handleChange}
                        values={values}
                        icon="LocalPhone"
                      />
                    </div>

                    <InputField
                      label="Address"
                      name="address"
                      type="text"
                      boxcolor="transparent"
                      placeholder="Address"
                      handleChange={handleChange}
                      values={values}
                      icon="Map"
                    />






<div className='w-full py-3 mt-5'>
                      <h2>Documentations</h2>
                    </div>
                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3 '>

                    <InputFileUpload
                      label="NIC"
                      name="nicDoc"
                      type="file"
                      boxcolor="transparent"
                      placeholder="nicImg"
                      icon="UploadFile"
                    />

                     <div className='flex flex-col w-full'>
                     <InputFileUpload
                      label="Business Registration"
                      name="brDoc"
                      type="file"
                      boxcolor="transparent"
                      placeholder="brFile"
                
                      icon="UploadFile"
                    />

                    <p>Note : if you dont have a registered business yet, leave this filed.</p>
                     </div>

                     


                    </div>



                    
                    <div className='md:w-1/2 w-full flex md:flex-row flex-col justify-between md:space-x-3 '>

                    <InputFileUpload
                      label="OTHER DOCUMENTS"
                      name="otherDoc"
                      type="file"
                      boxcolor="transparent"
                      placeholder="otherDoc"
                      icon="UploadFile"
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
                        // eventname={handleRegister}
                        textcolor="#fafafa"
                        label="Register"
                        colorfrom='#c026d3'
                        colorto='#a855f7'
                      />
                    </div>
{loading && <p>Please wait...</p>}

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

export default CustomerRegisterAdmin
