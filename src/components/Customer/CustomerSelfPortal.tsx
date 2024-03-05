import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../Forms/SelectGroup/SelectGroupOne';
import DefaultAdminLayout from '../../layout/DefaultAdminLayout';
import { Formik, Field, Form, ErrorMessage , FormikHelpers} from "formik";
import * as Yup from "yup";
import InputField from '../FormElements/InputFiled';
import PrimaryButton from '../FormElements/PrimaryButon';
import SelectField from '../FormElements/SelectField';
import CheckboxOne from '../Checkboxes/CheckboxOne';
import TextField from '../FormElements/TextFiled';
import InputFileUpload from '../FormElements/InputFileUpload';
import axios from 'axios';
import React, { useState } from 'react';

import Succeed from '../Admin/Modal/Succeed';
import VDlogo from '../../images/logo/logo.png'



type CustomerFormValuesType = {
  firstName: string;
  lastName: string;
  nicNo: string;
  brId: string;
  email: string;
  address: string;
  contactNo: string;
  package: string;
  payment: string;
  nicDoc: File | null;
  brDoc: File | null;
  otherDoc: File | null;
};



function CustomerSelfPortal() {


  const [showSucceedModal, setShowSucceedModal] = useState(false);

  const navigate = useNavigate();

  const CustomerRegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    nicNo: Yup.string().required("Required"),
    brId: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    package: Yup.string().required("Required"),
    payment: Yup.string().required("Required"),
    contactNo: Yup.string()
    .min(10, "must include a valid mobile number")
    .matches(/[0-9]/, "must includes only digits")
    .required("Required"),
 
    
  });









  const handleRegister = async (values: CustomerFormValuesType, { resetForm }: FormikHelpers<CustomerFormValuesType>): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('nicNo', values.nicNo);
      formData.append('brId', values.brId);
      formData.append('email', values.email);
      formData.append('address', values.address);
      formData.append('contactNo', values.contactNo);
      formData.append('package', values.package);
      formData.append('payment', values.payment);
  
      // Append files to the formData if they are not null
      if (values.nicDoc !== null) {
        formData.append('nicDoc', values.nicDoc);
      }
  
      if (values.brDoc !== null) {
        formData.append('brDoc', values.brDoc);
      }

      if (values.otherDoc !== null) {
        formData.append('otherDoc', values.otherDoc);
      }
  
      const response = await axios.post(`${config.baseUrl}/customerRegister`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any other headers as needed, such as authorization token
        },
      });
  
      // Extract customer ID from the response
      const customerId = response.data._id; // Assuming the customer ID is stored in the "_id" field
  
      // Use the obtained customer ID for further actions if needed
      console.log('Customer ID:', customerId);
  
      // Handle successful registration
      console.log('Registration successful', response.data);
      // Open the Succeed modal
      setShowSucceedModal(true);
  
      // Reset the form after successful registration
      resetForm();
    } catch (error) {
      // Handle registration error
      console.error('Registration error', error);
    }
  };
  

  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };


  return (
   
    <div className='md:p-5 p-2'>
<div className="w-full md:w-[70%] gap-9 sm:grid-cols-2 mx-auto">
        <div className="flex flex-col gap-9">
          {/* <!-- Customer Regsitration Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark w-full">
              

              <div className='md:w-1/4 relative mx-auto w-1/2'>
<img src={VDlogo} alt='Logo' className='object-cover w-full' />
              </div>
            </div>
            <div className="p-6.5">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  nicNo: "",
                  brId: "",
                  email: "",
                  address: "",
                  contactNo: "",
                  package: "",
                  payment: "",
                  otherDoc: null,
                  nicDoc: null,  // Add these lines
                  brDoc: null,

                }}
                validationSchema={CustomerRegistrationSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">


<div className='w-full '>
                      <h2>Self Regsitration Portal</h2>
                    </div>


                    


<div className='flex flex-col w-full'>
<InputField
                        label="Promo Code"
                        name="pmcode"
                        type="text"
                        icon="Code"
                        boxcolor="transparent"
                        placeholder="Promo Code"
                        handleChange={handleChange}
                        values={values}
                      />

                    <p className='text-red-500 text-[12px]'>Note : The Promo Code will be given by the sales agent. If you don't have a Promo Code please contact your Sales Agent. </p>
                     </div>




                    <div className='w-full flex flex-row justify-between space-x-3'>
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


                    <div className='w-full flex flex-row justify-between space-x-3'>
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
                        name="brId"
                        type="text"
                        boxcolor="transparent"
                        placeholder="BR ID"
                        handleChange={handleChange}
                        values={values}
                        icon="Nfc"
                      />
                    </div>



                    <div className='w-full flex flex-row justify-between space-x-3'>
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
                        name="contactNo"
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
                    <div className='w-full flex flex-row justify-between space-x-3 '>

                    <InputFileUpload
                      label="NIC"
                      name="nicDoc"
                      type="file"
                      boxcolor="transparent"
                      placeholder="nicDoc"
                      icon="UploadFile"
                    
                    />

                     <div className='flex flex-col w-full'>
                     <InputFileUpload
                      label="Business Registration"
                      name="brDoc"
                      type="file"
                      boxcolor="transparent"
                      placeholder="brDoc"
                
                      icon="UploadFile"
                    />

                    <p>Note : if you dont have a registered business yet, leave this filed.</p>
                     </div>

                     


                    </div>

                    <div className='md:w-1/2 w-full flex flex-row justify-between space-x-3 '>

                    <InputFileUpload
                      label="Other Documents"
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
                    <div className='w-full flex flex-row justify-between space-x-3 '>

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



                    <div className='w-full flex flex-row justify-between space-x-3 '>

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


                  </Form>

                )}




              </Formik>
            </div>
          </div>
        </div>
        <Succeed isOpen={showSucceedModal} onClose={handleCloseModal} />

      </div>
    </div>

      
    
  )
}

export default CustomerSelfPortal
