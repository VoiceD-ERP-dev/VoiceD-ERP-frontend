import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';



interface SalesAgentEditProps {
  salesAgentData: {
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
    
  };
  onClose: () => void;
}



const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    nic: Yup.string().required("Required"),
    brid: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contact: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    organization: Yup.string().required("Required"),
  });

  const handleRegister = () => {
    console.log('Registered');
  };

const SalesAgentEditContent = ({ salesAgentData, onClose }: SalesAgentEditProps) => (
  <div className='w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20 '>
    <div className='modal p-5 bg-white dark:bg-black rounded-lg md:w-[50%] w-full lg:w-[50%] max-h-150 overflow-auto border-[2px] border-[#b76bff]'>
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

      <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Sales Agent Editing Form</h3>

      <Formik
                initialValues={{
                  firstname: salesAgentData.firstname,
                  lastname: salesAgentData.lastname,
                  username: salesAgentData.username,
                  agentNo: salesAgentData.agentNo,
                  email: salesAgentData.email,
                  phone: salesAgentData.otherData[0].phone,
                    

                }}
                validationSchema={SignUpSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">






                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                      <InputFieldFilled
                        label="First Name"
                        name="firstname"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder={salesAgentData.firstname}
                        handleChange={handleChange}
                        values={values}
                      />
                      <InputFieldFilled
                        label="Last Name"
                        name="lastname"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder={salesAgentData.lastname}
                        handleChange={handleChange}
                        values={values}
                      />
                    </div>


                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                    <InputFieldFilled
                        label="Username"
                        name="username"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder={salesAgentData.username}
                        handleChange={handleChange}
                        values={values}
                        editable={false}
                      />
                      <InputFieldFilled
                        label="Agent No"
                        name="agentNo"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder={salesAgentData.agentNo}
                        handleChange={handleChange}
                        values={values}
                        editable={false}
                      />
                    </div>



                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                    <InputFieldFilled
                        label="Contact Number"
                        name="phone"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder={salesAgentData.otherData[0].phone}
                        handleChange={handleChange}
                        values={values}
                      />
                      <InputFieldFilled
                        label="Email"
                        name="email"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder={salesAgentData.email}
                        handleChange={handleChange}
                        values={values}
                      />
                    </div>



                    







                    <div className='w-full md:w-1/3 flex flex-row justify-between space-x-3'>
                      
                      <PrimaryButton
                        type="submit"

                        textcolor="#fafafa"
                        label="Submit"
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

function SalesAgentEdit({ salesAgentData, onClose }: SalesAgentEditProps) {



   



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => 
      <SalesAgentEditContent salesAgentData={salesAgentData} onClose={() => { onClose(); close(); }} />}
    </Popup>
  );
}

export default SalesAgentEdit;
