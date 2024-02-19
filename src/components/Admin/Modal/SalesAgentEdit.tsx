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
    fullName: string;
    
  };
  onClose: () => void;
}



const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
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
    <div className='modal p-5 bg-white dark:bg-black rounded-lg w-[50%] lg:w-[50%] h-auto border-[2px] border-[#b76bff]'>
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
                  fullName: salesAgentData.fullName,
                    

                }}
                validationSchema={SignUpSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">






                    <div className='w-full flex flex-row justify-between space-x-3'>
                      <InputFieldFilled
                        label="First Name"
                        name="fullName"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder={salesAgentData.fullName}
                        handleChange={handleChange}
                        values={values}
                      />
                      <InputFieldFilled
                        label="Last Name"
                        name="lastName"
                        type="text"
                        boxcolor="transparent"
                        placeholder={salesAgentData.fullName}
                        handleChange={handleChange}
                        values={values}
                        icon="AccountCircle"
                      />
                    </div>


                    <div className='w-full flex flex-row justify-between space-x-3'>
                      <InputFieldFilled
                        label="NIC"
                        name="nic"
                        type="text"
                        boxcolor="transparent"
                        placeholder={salesAgentData.fullName}
                        handleChange={handleChange}
                        values={values}
                        icon="ContactMail"
                      />
                      <InputFieldFilled
                        label="BR ID"
                        name="brid"
                        type="text"
                        boxcolor="transparent"
                        placeholder={salesAgentData.fullName}
                        handleChange={handleChange}
                        values={values}
                        icon="Nfc"
                      />
                    </div>



                    <div className='w-full flex flex-row justify-between space-x-3'>
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

                    <InputFieldFilled
                      label="Address"
                      name="address"
                      type="text"
                      boxcolor="transparent"
                      placeholder="Address"
                      handleChange={handleChange}
                      values={values}
                      icon="Map"
                    />


                    







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
