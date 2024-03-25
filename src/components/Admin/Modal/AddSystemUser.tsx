import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import Cookies from 'js-cookie';
import Succeed from './Succeed';
import SelectField from '../../FormElements/SelectField';


interface SalesAgentProps {

  onClose: () => void;
  handleRegister: (values: any) => void;

}



const SalesAgentRegSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  agentID: Yup.string()
    .min(8, 'must contain at least 6 characters')
    .matches(/[a-z]/, "must contain a LOWERCASE Letter")
    .matches(/[A-Z]/, "must contain a UPPERCASE Letter")
    .matches(/[0-9]/, "must contain a Digit")
    .required("Required"),
  userName: Yup.string()
    .min(6, 'must contain at least 6 characters')
    .matches(/[A-Z]/, "must contain a UPPERCASE Letter")
    .matches(/[0-9]/, "must contain a Digit")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  contactNo: Yup.string().required("Required"),
  userRole: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, 'must contain at least 6 characters')
    .matches(/[a-z]/, "must contain a LOWERCASE Letter")
    .matches(/[A-Z]/, "must contain a UPPERCASE Letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .matches(/[0-9]/, "must contain a Digit")
    .required("Required"),

});




const AddSystemUser: React.FC<SalesAgentProps> = ({ onClose }) => {

  const [showSucceedModal, setShowSucceedModal] = useState(false);

  const [loading, setLoading] = useState(false);


  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };


  const handleRegister = async (values: any, { resetForm }: FormikHelpers<any>) => {
    if(values.userRole=="sales"){
      try {
        setLoading(true);
        const jwtToken = Cookies.get('jwtToken');
        console.log(jwtToken);
        // Construct the headers object with the bearer token
        const headers = {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json' // Add this line
        };
        console.log('Registered:', JSON.stringify(values, null, 2));

        const jsonData = JSON.stringify({
          firstname: values.firstName || "John",
          lastname: values.lastName || "Doe",
          username: values.userName || "234",
          email: values.email || "shanbasnayake98@gmail.com",
          password: values.password || "1234",
          phone: values.contactNo || "1234567890",
          agentNo: values.agentID || "123456789",
          userRole: values.userRole || "admin",
        });

        // Make an HTTP POST request to the endpoint with the registration data and headers
        const response = await fetch('http://localhost:5001/api/salesmen/register', {
          method: 'POST',
          headers: headers,
          body: jsonData
        });

        // Check if the request was successful
        if (response.ok) {
          // Log success message or handle success response
          console.log('Registration successful!');
          setShowSucceedModal(true);
          resetForm();

        } else if (response.status === 401) {
          // Redirect to SignIn.tsx if unauthorized
          console.error('Unauthorized! Redirecting to sign-in page...');


        } else {
          // Handle error response
          console.error('Registration failed:', response.statusText);
        }

        setLoading(false);

      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }else if(values.userRole=="admin"||values.userRole=="superadmin"){
      try {
        setLoading(true);
    
        const headers = {
            'Content-Type': 'application/json'
        };
        console.log('Registered:', JSON.stringify(values, null, 2));
    
        const jsonData = JSON.stringify({
            firstname: values.firstName || "John",
            lastname: values.lastName || "Doe",
            username: values.userName || "234",
            email: values.email || "shanbasnayake98@gmail.com",
            password: values.password || "1234",
            phone: values.contactNo || "1234567890",
            agentNo: values.agentID || "123456789",
            adminRole: values.userRole || "admin",
        });
        console.log(jsonData);
        const response = await fetch('http://localhost:5001/api/admins/register', {
            method: 'POST',
            headers: headers,
            body: jsonData
        });
    
        if (response.ok) {
            console.log('Registration successful!');
            setShowSucceedModal(true);
            resetForm();
        } else if (response.status === 401) {
            console.error('Unauthorized! Redirecting to sign-in page...');
            // Redirect to SignIn.tsx if unauthorized
        } else {
            // Handle other HTTP errors
            console.error('Registration failed:', response.statusText);
            const errorMessage = await response.text(); // Extract error message from response body
            console.error('Error Message:', errorMessage);
            // Display error message to the user or handle as needed
        }
    
        setLoading(false);
    } catch (error) {
        // Handle other errors
        console.error('Error:', error);
        setLoading(false);
    }

    }
  };



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => (
        <SalesAgentContent
          onClose={() => {
            onClose();
            close();
          }}
          handleRegister={handleRegister}
          handleCloseModal={handleCloseModal}
          showSucceedModal={showSucceedModal}
          loading={loading}
        />
      )}
    </Popup>
  );
};





const SalesAgentContent: React.FC<SalesAgentProps & { handleRegister: (values: any) => void, handleCloseModal: () => void, showSucceedModal: boolean, loading: boolean }> = ({ onClose, handleRegister, handleCloseModal, showSucceedModal, loading }) => (
  <div className='w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20 '>
    <div className='modal p-5 bg-white dark:bg-black rounded-lg md:w-[50%] lg:w-[50%] max-h-150 border-[2px] border-[#b76bff] w-full overflow-auto'>
      <div className='flex flex-row justify-end w-full'>
        <div
          className='close w-[22px] h-[22px] rounded-full bg-[#b76bff] text-[#ffffff] flex justify-center items-center cursor-pointer'

        >
          <FontAwesomeIcon

            onClick={() => {
              onClose();
            }}

            icon={faClose} />
        </div>
      </div>

      <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>System User Registration Form</h3>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          agentID: "",
          userName: "",
          password: "",
          email: "",
          contactNo: "",
          userRole: "",

        }}
        validationSchema={SalesAgentRegSchema}
        onSubmit={handleRegister}
      >



        {({ errors, touched, handleChange, values }) => (

          <Form className=" w-full  overflow-auto">



            <div className='w-full flex md:flex-row justify-between md:space-x-3 flex-col '>

              <InputFieldFilled
                label="Employee ID"
                name="agentID"
                type="text"
                boxcolor="transparent"
                placeholder="Employee ID"
                handleChange={handleChange}
                values={values}
                icon="CoPresent"
              />

              <SelectField
                label='User role'
                name='userRole'
                headingvalue='Select user Role'
                boxcolor='transparent'
                options={['superadmin', 'admin', 'sales', 'finance']}
                icon="Payments"
                handleChange={handleChange}
                values={values}
              />

            </div>




            <div className='w-full flex md:flex-row justify-between md:space-x-3 flex-col'>
              <InputFieldFilled
                label="First Name"
                name="firstName"
                type="text"
                icon="AccountCircle"
                boxcolor="transparent"
                placeholder="First Name"
                handleChange={handleChange}
                values={values}
              />
              <InputFieldFilled
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




            <div className='w-full flex md:flex-row justify-between md:space-x-3 flex-col'>
              <InputFieldFilled
                label="Email"
                name="email"
                type="text"
                boxcolor="transparent"
                placeholder="Email"
                handleChange={handleChange}
                values={values}
                icon="AlternateEmail"
              />
              <InputFieldFilled
                label="Contact Number"
                name="contactNo"
                type="text"
                boxcolor="transparent"
                placeholder="Contact"
                handleChange={handleChange}
                values={values}
                icon="LocalPhone"
              />
            </div>


            <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
              <InputFieldFilled
                label="User Name"
                name="userName"
                type="text"
                boxcolor="transparent"
                placeholder="User Name"
                handleChange={handleChange}
                values={values}
                icon="PersonAddAlt"
              />
              <InputFieldFilled
                label="Password"
                name="password"
                type="text"
                boxcolor="transparent"
                placeholder="Password"
                handleChange={handleChange}
                values={values}
                icon="Password"
              />
            </div>












            <div className='w-full md:w-1/3 flex flex-row justify-between space-x-3'>

              <PrimaryButton
                type="submit"

                textcolor="#fafafa"
                label="Register"
                colorfrom='#c026d3'
                colorto='#a855f7'
              />
            </div>


            {loading &&

              <div className='w-full mt-2 text-center'>
                <p className='text-[12px]'>Please wait...</p>
              </div>


            }


            <Succeed isOpen={showSucceedModal} onClose={handleCloseModal} />


          </Form>

        )}




      </Formik>
    </div>
  </div>
);




export default AddSystemUser;
