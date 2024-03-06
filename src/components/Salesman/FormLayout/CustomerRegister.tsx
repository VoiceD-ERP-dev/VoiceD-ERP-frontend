import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import InputField from '../../FormElements/InputFiled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import InputFileUpload from '../../FormElements/InputFileUpload';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import Succeed from '../Modal/Succeed';








type CustomerFormValuesType = {
  firstName: string;
  lastName: string;
  nicNo: string;
  brid: string;
  email: string;
  address: string;
  otp: string;
  contact: string;
  nicDoc: File | null;
  brDoc: File | null;
  otherDoc: File | null;
};


function CustomerRegister({ userRole }: { userRole: string }) {

  const [showSucceedModal, setShowSucceedModal] = useState(false);
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOTPWarning, setShowOTPWarning] = useState(false);
  const [confirmVerify, setConfirmVerify] = useState(false);
  const [timer, setTimer] = useState({ minutes: 5, seconds: 0 });
  const [loading, setLoading] = useState(false);
  const [showVerifyBox, setShowVerifyBox] = useState(false);


  const CustomerRegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    nicNo: Yup.string().required("Required"),
    otp: Yup.string()
      .min(6, "Required 6 Digits")
      .max(6, "Required 6 Digits"),
    brid: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contact: Yup.string()
      .min(10, "must include a valid mobile number")
      .matches(/[0-9]/, "must includes only digits")
      .required("Required"),

  });



  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };



  const startTimer = () => {
    const interval = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(interval);
        // Handle timer expiration, e.g., show a message or resend OTP
      } else {
        setTimer((prevTimer) => {
          const newSeconds = prevTimer.seconds === 0 ? 59 : prevTimer.seconds - 1;
          const newMinutes = prevTimer.seconds === 0 ? prevTimer.minutes - 1 : prevTimer.minutes;
          return { minutes: newMinutes, seconds: newSeconds };
        });
      }
    }, 2000);
  };


  const handleRegister = (values: CustomerFormValuesType, { resetForm }: FormikHelpers<CustomerFormValuesType>) => {
    if (!confirmVerify) {
      // The mobile number is not verified
      setShowOTPWarning(true);
      return;
    }

    setShowOTPWarning(false); // Reset the warning flag
    console.log('Now register the customer');
    // Additional logic for customer registration
    setShowSucceedModal(true);
    resetForm();
    setConfirmVerify(false);
  };





  const showVerifyEdit = () => {
    setTimer({ minutes: 5, seconds: 0 }); // Reset the timer when triggered
    setShowVerifyBox(true);
    setShowOTPWarning(false);
    startTimer();
  };

  useEffect(() => {
    if (showVerifyBox) {
      startTimer();
    }
  }, [showVerifyBox]);

  const handleVerify = (values: any) => {
    setConfirmVerify(true);
    setShowOTPWarning(false);
    console.log('Mobile Number Verified!');
    // Additional logic for OTP verification
  };





  return (
    <DefaultLayout userRole={userRole}>
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
                  otp: "",
                  nicDoc: null,  // Add these lines
                  brDoc: null,
                  otherDoc: null,
                }}
                validationSchema={CustomerRegistrationSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">




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
                        label="Address"
                        name="address"
                        type="text"
                        boxcolor="transparent"
                        placeholder="Address"
                        handleChange={handleChange}
                        values={values}
                        icon="Map"
                      />
                    </div>

                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3 '>
                      <div className='w-1/2 flex justify-start items-end flex-row space-x-2'>
                        <div className='w-3/4 ' >
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

                        <div className='w-1/4 ' >
                          <button
                            type="button"
                            onClick={showVerifyEdit}
                            className='text-[#40d659] bg-transparent border-[1px] rounded-md border-[#40d659] px-4 py-2 h-[44px]'


                          >Send OTP</button>
                        </div>


                      </div>


                    </div>
                    {showVerifyBox && (

                      <div className='w-full flex flex-col justify-between mt-5'>
                        <div className='w-1/2 flex justify-start items-end flex-row space-x-2'>
                          <h2 className='text-[#161616] dark:text-[#fafafa] font-semibold'>Verify Your Mobile Number</h2>
                        </div>

                        <div className='w-1/2 flex flex-row justify-between items-center '>
                          <div className='w-3/4 flex flex-col space-y-2'>
                            <div className='w-full flex justify-between items-end space-x-2 flex-row -mt-5'>
                              <InputField

                                name="otp"
                                type="text"
                                boxcolor="transparent"
                                placeholder="OTP"
                                handleChange={handleChange}
                                values={values}
                                icon="Pin"
                              />
                              <div className='w-1/4 ' >
                                <PrimaryButton
                                  type="button"
                                  eventname={handleVerify}
                                  textcolor="#fafafa"
                                  label="Verify"
                                  bgcolor='#40d659'
                                />
                              </div>

                            </div>

                            <div className=' w-full flex md:flex-row justify-between flex-col mt-2'>
                              <span className='font-semibold text-[#a855f7]'>
                                <span className='font-semibold text-[#a855f7]'>
                                  {`${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`}
                                </span>

                              </span>
                              <span className='text-[#a855f7] cursor-pointer'>Resend Code</span>
                            </div>
                            {
                              confirmVerify && (
                                <p className='text-[12px] text-green-600'>Mobile number Verified!</p>
                              )
                            }
                          </div>



                        </div>



                      </div>
                    )}




                    {showOTPWarning && (
                      <p className='text-red-600 text-[12px] mt-2'>Please Verify the Mobile Number before continuing</p>
                    )}




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
    </DefaultLayout>
  )
}

export default CustomerRegister
