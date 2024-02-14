import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/FormElements/InputFiled';
import PrimaryButton from '../../components/FormElements/PrimaryButon';
import Logo from '../../images/logo/logo.png'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CoverVid from '../../images/coverVideo/vidcover.mp4';
import '../../css/parallax.css'



interface SignInProps {
  onLogin: (role: string) => void; // Callback function to handle login with role
}



const SignIn: React.FC<SignInProps> = ({ onLogin }) => {



  const navigate = useNavigate();
  


  const SignUpSchema = Yup.object().shape({
    userID: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
  });


  const handleLogin = async (values: { userID: string; password: string }) => {
    // Assuming you have an authentication function that returns the user role
    const userRole = await authenticate(values.userID, values.password);

    if (userRole === 'admin') {
      onLogin('admin');
      navigate('/adminDashboard');
    } else if (userRole === 'sales') {
      onLogin('sales');
      navigate('/dashboard');
    } else {
      // Handle other roles or scenarios as needed
      console.error('Unknown user role:', userRole);
    }
  };

  const authenticate = async (userID: string, password: string) => {
    // Replace this with your actual authentication logic
    // For example, you might make an API call to authenticate the user
    // and retrieve the user role.
    // For simplicity, this function returns a hardcoded role after a delay.
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        // Replace 'admin' with the actual user role obtained from authentication
        resolve('sales');
      }, 1000);
    });
  };



  return (
    <div className='w-full h-screen flex justify-center items-center relative loginScreen '>
      <div className='w-screen h-screen absolute top-0 left-0 right-0 bottom-0 z-1'>


       
<div className='w-full h-full'>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover -z-1"
      >
        <source src={CoverVid}  type="video/mp4" />
       
      </video>
    </div>


      </div>


      <div className='w-full md:w-full lg:w-2/3 p-0 md:-p-5 flex flex-col justify-center items-center mx-auto '>


      <div className='flex md:hidden w-[520px] h-[520px] -bottom-1/2 bg-[#ffffff]
  
    rounded-full z-10 absolute mx-auto'>
      
    </div>

        <div className="md:p-6.5 p-2 md:w-10/12 lg:w-8/12 w-full z-10  md:bg-white backdrop-blur-md rounded-md">
          <div className='logo-wrapper w-8/12 relative md:w-6/12 lg:w-6/12 mx-auto'>
            <img src={Logo} alt='logo' className='w-full object-cover' />
          </div>



          <Formik
            initialValues={{
              userID: "",
              password: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleLogin}
          >



            {({ errors, touched, handleChange, values }) => (

              <Form className=" w-full">

                <div className='w-full flex flex-col '>




                  <InputField
                    label="User ID"
                    name="userID"
                    type="text"
                    icon="AccountCircle"
                    boxcolor="transparent"
                    placeholder="User ID"
                    handleChange={handleChange}
                    values={values}

                  />
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    boxcolor="transparent"
                    placeholder="Password"
                    handleChange={handleChange}
                    values={values}
                    icon="Key"

                  />



                </div>



                <PrimaryButton
                  type="submit"

                  textcolor="#fafafa"
                  label="Login"
                  colorfrom='#1847a1'
                  colorto='#802686'
                />



              </Form>

            )}




          </Formik>
        </div>


<div className='w-full p-5 absolute bottom-5 md:hidden z-50 justify-center items-center flex'>
<h2 className='text-[12px]'>All Rights Reserved | Powered by <span className='text-[#802686] font-semibold'>VoiceD</span> </h2>
</div>


      </div>
    </div>
  );
};

export default SignIn;
