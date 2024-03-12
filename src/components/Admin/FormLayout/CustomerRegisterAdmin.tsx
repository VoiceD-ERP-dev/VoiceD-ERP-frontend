import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from '../../FormElements/InputFiled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import InputFileUpload from '../../FormElements/InputFileUpload';
import Cookies from 'js-cookie';
import Succeed from '../Modal/Succeed';
import { useState , useEffect } from 'react';




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




  const handleRegister =async ( values: CustomerFormValuesType, { resetForm }: FormikHelpers<CustomerFormValuesType> ) => {
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
  




  const showVerifyEdit = (values: any) => {
    setTimer({ minutes: 5, seconds: 0 }); // Reset the timer when triggered
    setShowVerifyBox(true);
    setShowOTPWarning(false);
    startTimer();
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
      // Handle success response if needed
      console.log('OTP sent successfully');
      console.log(response.json().then(otpresult=>{
        console.log("OTP:",otpresult.otp)
      
      }))
    })
    .catch(error => {
      console.error('Error sending OTP:', error.message);
      // Handle error if needed
    });

  };

  useEffect(() => {
    if (showVerifyBox) {
      startTimer();
    }
  }, [showVerifyBox]);

  const handleVerify = async (values: any) => {
    try {
      setConfirmVerify(true);
      setShowOTPWarning(false);
      
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
  
      console.log('OTP verified successfully!');
      // Additional logic after OTP verification
    } catch (error: any) { // Explicitly type 'error' as 'any' or 'Error'
      console.error('Error verifying OTP:', error.message);
      // Show user-friendly error message to the user
      //lert(error.message || 'Failed to verify OTP. Please try again later.');
      // Handle error if needed
    }
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
                  otp:"",
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
                            onClick={() => showVerifyEdit(values)}
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
                                  onClick={() => handleVerify(values)}
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
    </DefaultAdminLayout>
  )
}

export default CustomerRegisterAdmin
