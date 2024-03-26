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
  const navigate = useNavigate();
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
  const [resetCountdown, setResetCountdown] = useState<number>(0);
  const [isNICFound, setIsNICFound] = useState(false);
  const [isBRIDFound, setIsBRIDFound] = useState(false);
  const [isEmailFound, setIsEmailFound] = useState(false);
  const [isNumberEx, setIsNumberEx] = useState(false);





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
      .max(10, "must include a valid mobile number")
      .matches(/[0-9]/, "must includes only digits")
      .required("Required"),

  });



  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };




  const handleCountdownComplete = () => {
    // Your logic when the countdown is completed
    setIsSendButtonEnabled(true);
    setIsResendButtonEnabled(true);
    setButtonBorderColor('#40d659'); // Green border color
    setButtonTextColor('#40d659'); // Green text color
    setIsTimerExpired(true);
  };



  const handleResendOTP = (values: any) => {
    showVerifyEdit(values)
    setIsResendButtonEnabled(false);
    // Trigger reset and start the countdown
    setResetCountdown((prev) => prev + 1);
    
  };



  const handleRegister =async ( values: CustomerFormValuesType, { resetForm }: FormikHelpers<CustomerFormValuesType> ) => {
    
    if (!confirmVerify) {
      // The mobile number is not verified
      setShowOTPWarning(true);
      return;
    }

    setShowOTPWarning(false); // Reset the warning flag
    setShowSendOTP(true);
    console.log('Now register the customer');
    // Additional logic for customer registration

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
      const response = await fetch('http://localhost:5001/api/customers/cv', {
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
        resetForm();
        setConfirmVerify(false);
        setIsNICFound(false);
        setIsBRIDFound(false);
        setIsEmailFound(false);
      } else if (response.status === 401) {
        // Redirect to SignIn.tsx if unauthorized
        console.error('Unauthorized! Redirecting to sign-in page...');
        navigate('/'); // Assuming 'navigate' is a function from react-router-dom
    
      } else {
        const responseData = await response.json();
        console.error('Registration failed:', responseData.message);
        if (responseData.message.includes('NIC')) {
          setIsNICFound(true);
          setIsBRIDFound(false);
          setIsEmailFound(false);
        }
        if (responseData.message.includes('BRID')) {
          setIsBRIDFound(true);
          setIsNICFound(false);
          setIsEmailFound(false);
        }
        if (responseData.message.includes('Email')) {
          setIsEmailFound(true);
          setIsNICFound(false);
          setIsBRIDFound(false);

        }
      }
      setLoading(false);

    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
    console.log(values);
  };





  const showVerifyEdit =async (values: any) => {




    if (!values.contact) {
      setIsContactMissing(true)
      console.error('Must include a contact number');
      return;
    }

    let phoneNo = values.contact;
    console.log(phoneNo.length);


    if(phoneNo.length === 10)
    {

      setIsContactMissing(false)
      setTimer({ minutes: 5, seconds: 0 }); // Reset the timer when triggered
      setShowVerifyBox(true);
      setShowOTPWarning(false);
      // startTimer();
      console.log(values.contact);
  
  
      // Assuming `values.contact` contains the phone number
      
  
      // Remove any whitespace and hyphens from the phone number
      phoneNo = phoneNo.replace(/\s|-/g, '');
  
      // If the phone number starts with '0', replace it with '+94'
      if (phoneNo.startsWith('0')) {
        phoneNo = '+94' + phoneNo.substring(1);
      }
  
      // Create the JSON payload
      const payload = {
        phoneNo: phoneNo,
        nicNo:values.nicNo, 
        email:values.email, 
        brId:values.brid
      };
  
      // Make the HTTP POST request to the endpoint
      fetch('http://localhost:5001/api/otp/sendopt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(async response => {
          
          const responseData = await response.json(); // Parse the JSON from the response
          if (!response.ok) {
            throw new Error(responseData.message || 'Failed to send OTP');
            
          }
          console.log('OTP sent successfully');
          console.log('OTP CODE: ', responseData.otp);
          setShowSendOTP(false)
          setShowResend(true)
          setIsNumberEx(false);

          // // Handle success response if needed
          // console.log(response.json().then(otpresult => {
          //   console.log('OTP CODE: ', otpresult.otp)
          // }))
  
  
          setButtonBorderColor("#565656");
          setButtonTextColor("#565656");
          setIsSendButtonEnabled(false);
        })
        .catch(error => {
          console.error('Error sending OTP:', error.message);
          
          if(error.message = "Phone number already registered")
          {
            setIsNumberEx(true);
            setShowVerifyBox(false);
          }

        })
        .finally(() => {
          setIsSendingOTP(true); // Enable the button after completing the request
        });
        
    }
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
     
    } catch (error: any) {

      console.error('Error verifying OTP:', error.message);
      if (error.message === 'OTP is incorrect') {
        setIsOtpIncorrect(true)
        setIsOtpExpired(false);
      }
      if (error.message === 'OTP is expired') {
        setIsOtpIncorrect(false)
        setIsOtpExpired(false);
        setIsOtpExpired(true);
      }


    }
  };




  useEffect(() => {
    if (showVerifyBox) {
      setIsSendButtonEnabled(false); 
    }
  }, [showVerifyBox]);



const [makeEditable, setMakeEditable]= useState<boolean>(false);

  const handleDisable = () => {
    if (showVerifyBox || confirmVerify) {
      return true; 
    }
    else {
      return false; 
    }   
  };


  const handleEnable = () => {
 if (isTimerExpired)
 {
   return false;
 } 
 else {
   return true; 
 }
  }


  const handleDisabletoEnable = () => {
    console.log("handleDisable function:", handleDisable());
    console.log("handleEnable function:", handleEnable());

    // if(handleDisable() === true && handleEnable() === false)
    // {
    //   setMakeEditable(false);
    // }

    //   return makeEditable;
    return handleDisable();
    // return handleEnable();
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

                      <div className='md:w-1/2 w-full'>
                      {isNICFound &&
                    (
                         <p className='text-red-600 text-[12px] mt-2'>This NIC is already exists</p>
                         )}     
                        </div>
                     
                        <div className='md:w-1/2 w-full'>
                        {isBRIDFound &&
                    (
                      <p className='text-red-600 text-[12px] mt-2'>This BRID is already exists</p>
                    )}
                        </div>
                    
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

                      <div className='md:w-1/2 w-full'>
                      {isEmailFound &&
                    (
                         <p className='text-red-600 text-[12px] mt-2'>This Email is already exists</p>
                         )}     
                        </div>
                    
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
                            disabled={handleDisabletoEnable()}
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
                              
                                <CountDown 
                                onCountdownComplete={handleCountdownComplete}
                                shouldStart={isResendButtonEnabled}
                                resetKey={resetCountdown}
                                />



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
                    {isNumberEx && (
                      <p className='text-red-600 text-[12px] mt-2'>This Phone number Already exists!</p>
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

        <Succeed isOpen={showSucceedModal} onClose={handleCloseModal} message='Customer Registered Successfully'/>

      </div>
    </DefaultAdminLayout>
  )
}

export default CustomerRegisterAdmin
