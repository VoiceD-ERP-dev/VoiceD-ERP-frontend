import { Link, json, useAsyncError, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from '../../FormElements/InputFiled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import InputFileUpload from '../../FormElements/InputFileUpload';
import Cookies from 'js-cookie';
import Succeed from '../Modal/Succeed';
import { useState, useEffect } from 'react';
import OTPInputField from '../../FormElements/OtpInput';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import CountDown from '../../CountDowns/CountDown';




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


function CustomerRegisterAdmin({ userRole }: { userRole: string }) {

  const [showSucceedModal, setShowSucceedModal] = useState(false);
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [isOtpIncorrect, setIsOtpIncorrect] = useState(false);
  const [showOTPWarning, setShowOTPWarning] = useState(false);
  const [confirmVerify, setConfirmVerify] = useState(false);
  const [timer, setTimer] = useState({ minutes: 5, seconds: 0 });
  const [loading, setLoading] = useState(false);
  const [showVerifyBox, setShowVerifyBox] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isContactMissing, setIsContactMissing] = useState(false);
  const [buttonBorderColor, setButtonBorderColor] = useState("#40d659");
  const [buttonTextColor, setButtonTextColor] = useState("#40d659");
  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(true);
  const [isTimerExpired, setIsTimerExpired] = useState(true);
  const [showResend, setShowResend] = useState(false);
  const [showSendOTP, setShowSendOTP] = useState(true);
  const [isResendButtonEnabled, setIsResendButtonEnabled] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);



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






  // const startTimer = () => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       const newSeconds =
  //         prevTimer.seconds === 0 ? 59 : prevTimer.seconds - 1;
  //       const newMinutes =
  //         prevTimer.seconds === 0 ? prevTimer.minutes - 1 : prevTimer.minutes;

  //       if (newMinutes === 0 && newSeconds === 0) {
  //         clearInterval(interval);
  //         setIsSendButtonEnabled(true);
  //         setIsResendButtonEnabled(true);
  //         setButtonBorderColor("#40d659"); // Green border color
  //         setButtonTextColor("#40d659"); // Green text color
  //         setIsTimerExpired(true);
  //       }



  //       return { minutes: newMinutes, seconds: newSeconds };
  //     });

  //     // Stop the interval if it reaches 00:00
  //     if (timer.minutes === 0 && timer.seconds === 0) {
  //       clearInterval(interval);
  //     }
  //   }, 2000);
  // };



  const handleCountdownComplete = () => {
    // Your logic when the countdown is completed
    setIsSendButtonEnabled(true);
    setIsResendButtonEnabled(true);
    setButtonBorderColor('#40d659'); // Green border color
    setButtonTextColor('#40d659'); // Green text color
    setIsTimerExpired(true);
  };



  const handleResendOTP = (values: any) => {
    // Implement the logic to resend OTP
    // Disable the Resend OTP button and start the timer
    showVerifyEdit(values)
    setIsResendButtonEnabled(false);
    // startTimer();
    
  };



  const handleRegister = (values: CustomerFormValuesType, { resetForm }: FormikHelpers<CustomerFormValuesType>) => {
    if (!confirmVerify) {
      // The mobile number is not verified
      setShowOTPWarning(true);
      return;
    }

    setShowOTPWarning(false); // Reset the warning flag
    setShowSendOTP(true);
    console.log('Now register the customer');
    // Additional logic for customer registration
    setShowSucceedModal(true);
    resetForm();
    setConfirmVerify(false);
  };





  const showVerifyEdit = (values: any) => {




    if (!values.contact) {
      setIsContactMissing(true)
      console.error('Must include a contact number');
      return;
    }


    setIsContactMissing(false)
    setTimer({ minutes: 5, seconds: 0 }); // Reset the timer when triggered
    setShowVerifyBox(true);
    setShowOTPWarning(false);
    // startTimer();
    console.log(values.contact);


    // Assuming `values.contact` contains the phone number
    let phoneNo = values.contact;

    // Remove any whitespace and hyphens from the phone number
    phoneNo = phoneNo.replace(/\s|-/g, '');

    // If the phone number starts with '0', replace it with '+94'
    if (phoneNo.startsWith('0')) {
      phoneNo = '+94' + phoneNo.substring(1);
    }

    // Create the JSON payload
    const payload = {
      phoneNo: phoneNo
    };

    // Make the HTTP POST request to the endpoint
    fetch('http://localhost:5001/api/otp/sendopt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send OTP');
        }
        console.log('OTP sent successfully');
        setShowSendOTP(false)
        setShowResend(true)
        // Handle success response if needed
        console.log(response.json().then(otpresult => {
          console.log('OTP CODE: ', otpresult.otp)
        }))


        setButtonBorderColor("#565656");
        setButtonTextColor("#565656");
        setIsSendButtonEnabled(false);
      })
      .catch(error => {
        console.error('Error sending OTP:', error.message);
        // Handle error if needed
      })
      .finally(() => {
        setIsSendingOTP(true); // Enable the button after completing the request
      });

  };







  const handleVerify = async (values: any) => {
    try {

      setShowOTPWarning(false);
      setIsOtpExpired(false);

      const { otp, contact } = values; // Destructure otp and contact from values

      // Assuming `contact` contains the phone number
      let phoneNo = contact;

      // Remove any whitespace and hyphens from the phone number
      phoneNo = phoneNo.replace(/\s|-/g, '');

      // If the phone number starts with '0', replace it with '+94'
      if (phoneNo.startsWith('0')) {
        phoneNo = '+94' + phoneNo.substring(1);
      }

      // Create the JSON payload
      const payload = {
        userOTP: otp,
        phoneNo: phoneNo
      };

      // Make the HTTP POST request to the endpoint
      const response = await fetch('http://localhost:5001/api/otp/compareotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to verify OTP');
      }


      setConfirmVerify(true)
      setIsOtpIncorrect(false)
      console.log('OTP verified successfully!')
      setShowVerifyBox(false)
      setIsOtpExpired(false);

      if (responseData.message === 'Mobile Number Verified') {
        setShowResend(false);
        setShowSendOTP(false);
        setIsOtpExpired(false);
      }
      else if (responseData.message === 'OTP is expired') {
        setIsOtpExpired(true);
      }

      // Additional logic after OTP verification
    } catch (error: any) {

      console.error('Error verifying OTP:', error.message);
      if (error.message === 'OTP is incorrect') {
        setIsOtpIncorrect(true)
        setIsOtpExpired(false);
      }


    }
  };



  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(interval);

      }
    }, 2000);

    return () => clearInterval(interval);
  }, [timer]);


  useEffect(() => {
    if (showVerifyBox) {
      setIsSendButtonEnabled(false); // Disable the button when starting the timer
      // startTimer();
    }
  }, [showVerifyBox]);



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
                        <div className='w-2/3 ' >
                          <OTPInputField
                            label="Contact"
                            name="contact"
                            type="text"
                            boxcolor="transparent"
                            placeholder="Contact"
                            handleChange={handleChange}
                            values={values}
                            icon="LocalPhone"
                            disabled={confirmVerify}
                          />

                        </div>

                        <div className='w-1/3 ' >

                          {
                            showSendOTP && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (isTimerExpired) {
                                    showVerifyEdit(values);
                                  }
                                }}
                                className='text-[#40d659] bg-transparent border-[1px] rounded-md border-[#40d659] px-4 py-2 h-[44px]'

                              >
                                Send OTP
                              </button>
                            )
                          }

                          {
                            showResend && (
                              <button
                                type="button"
                                onClick={() => handleResendOTP(values)}
                                disabled={!isResendButtonEnabled}
                                className='text-[#40d659] bg-transparent border-[1px] rounded-md border-[#40d659] px-4 py-2 h-[44px]'
                                style={{ borderColor: buttonBorderColor, color: buttonTextColor }}
                              >
                                Resend OTP
                              </button>
                            )
                          }

                        </div>
                      </div>

                    </div>


                    {showVerifyBox && (

                      <div className='w-full flex flex-col justify-between mt-5'>
                        <div className='w-1/2 flex justify-start items-end flex-row space-x-2'>
                          <h2 className='text-[#161616] dark:text-[#fafafa] font-semibold'>Verify Your Mobile Number</h2>
                        </div>

                        <div className='w-1/2 flex flex-row justify-between items-center '>
                          <div className='w-full flex flex-col space-y-2'>
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
                                  onClick={() => handleVerify(values)}
                                  textcolor="#fafafa"
                                  label="Verify"
                                  bgcolor='#40d659'
                                />
                              </div>

                            </div>

                            <div className=' w-full flex md:flex-row justify-between flex-col mt-2'>
                              <span className='font-semibold text-[#a855f7]'>
                                {/* <span className='font-semibold text-[#a855f7]'>
                                  {timer.minutes >= 0 && timer.seconds >= 0
                                    ? `${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`
                                    : '00:00'}
                                </span> */}

                                {/* <CountdownCircleTimer
    isPlaying
    duration={300}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer> */}

                                {/* <CountdownCircleTimer
  isPlaying
  duration={300}
  colors={['#004777', '#F7B801', '#A30000', '#A30000']}
  colorsTime={[7, 5, 2, 0]}
>
  {({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // Add leading zero if necessary
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return formattedTime;
  }}
</CountdownCircleTimer> */}

                                <CountDown 
                                onCountdownComplete={handleCountdownComplete}/>



                              </span>

                            </div>

                          </div>



                        </div>



                      </div>
                    )}


                    {isContactMissing && (
                      <p className='text-red-600 text-[12px] mt-2'>Please Enter your valid mobile Number</p>
                    )}

                    {showOTPWarning && (
                      <p className='text-red-600 text-[12px] mt-2'>Please Verify the Mobile Number before continuing</p>
                    )}
                    {
                      confirmVerify && (
                        <p className='text-[12px] text-green-600'>Mobile number Verified!</p>
                      )
                    }
                    {isOtpIncorrect && (
                      <p className='text-red-600 text-[12px] mt-2'>Incorrect OTP. Please Enter the correct OTP.</p>
                    )}
                    {isOtpExpired && (
                      <p className='text-red-600 text-[12px] mt-2'>OTP is Expired!</p>
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
    </DefaultAdminLayout>
  )
}

export default CustomerRegisterAdmin
