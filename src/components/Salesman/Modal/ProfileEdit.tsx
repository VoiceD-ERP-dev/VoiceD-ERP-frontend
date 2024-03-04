import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';



interface ProfileEditProps {
 
  
  
  onClose: () => void;
}



const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contactNo: Yup.string().required("Required"),
  });

  const handleEdit = () => {
    console.log('Registered');
  };

const ProfileEditContent = ({ onClose,  }: ProfileEditProps) => (
  <div className='w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20 '>
    <div className='modal p-5 bg-white dark:bg-black rounded-lg md:w-[50%] lg:w-[50%] w-full max-h-150 border-[2px] border-[#b76bff] overflow-auto'>
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

      <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Profile Editing Form</h3>

      <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  contactNo: "",

                }}
                validationSchema={ProfileSchema}
                onSubmit={handleEdit}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">






                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                      <InputFieldFilled
                        label="First Name"
                        name="firstName"
                        type="text"
                        icon="AccountCircle"
                        boxcolor="transparent"
               
                        handleChange={handleChange}
                        values={values}
                      />
                      <InputFieldFilled
                        label="Last Name"
                        name="lastName"
                        type="text"
                        boxcolor="transparent"
                       
                        handleChange={handleChange}
                        values={values}
                        icon="AccountCircle"
                      />
                    </div>


                   



                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
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

function ProfileEdit({  onClose }: ProfileEditProps) {



   



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => 
      <ProfileEditContent 
      
      onClose={() => { onClose(); close(); }} />}
    </Popup>
  );
}

export default ProfileEdit;
