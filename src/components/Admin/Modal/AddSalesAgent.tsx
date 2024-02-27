import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';



interface SalesAgentProps {
  
  onClose: () => void;
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
    password: Yup.string()
    .min(8, 'must contain at least 6 characters')
    .matches(/[a-z]/, "must contain a LOWERCASE Letter")
    .matches(/[A-Z]/, "must contain a UPPERCASE Letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .matches(/[0-9]/, "must contain a Digit")
    .required("Required"),
    
  });

  const handleRegister = () => {
    console.log('Registered');
  };

const SalesAgentContent = ({ onClose }: SalesAgentProps) => (
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

      <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Sales Agent Registration Form</h3>

      <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    agentID:"",
                    userName:"",
                    password:"",
                    email: "",
                    contactNo: "",
                   
                }}
                validationSchema={SalesAgentRegSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full  overflow-auto">



<div className='w-full flex md:flex-row justify-between md:space-x-3 flex-col '>
                     
                      <InputFieldFilled
                        label="Agent ID"
                        name="agentID"
                        type="text"
                        boxcolor="transparent"
                        placeholder="Agent ID"
                        handleChange={handleChange}
                        values={values}
                        icon="CoPresent"
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


                  </Form>

                )}




              </Formik>
    </div>
  </div>
);

function AddSalesAgent({ onClose }: SalesAgentProps) {



   



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => 
      <SalesAgentContent onClose={() => { onClose(); close(); }} />}
    </Popup>
  );
}

export default AddSalesAgent;
