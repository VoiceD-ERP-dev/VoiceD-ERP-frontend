import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import Cookies from 'js-cookie';
import axios from 'axios';


interface OrderEditProps {
  orderData: {
    firstname: string;
    lastname: string;
    nicNo: string;
    brId: string;
    email: string;
    address: string;
    phone: string;
    organization: string;
  };
  onClose: () => void;
}



const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    nicNo: Yup.string().required("Required"),
    brId: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    organization: Yup.string().required("Required"),
  });

  const handleRegister = async (values: any): Promise<void>=> {
    console.log('Registered');
    let phoneNo = values.phone;

    // Extract the JWT token from local storage
    const jwtToken = Cookies.get('jwtToken');

    // Construct the headers object with the bearer token
    const headers = {
      'Authorization': `Bearer ${jwtToken}`,
    };

        // Make an HTTP GET request to the endpoint with the phone number and headers
    const response = await fetch(`http://localhost:5001/api/orders/findbyPhone/${phoneNo}`, {
        method: 'GET',
        headers: headers
    });

      // Check if the request was successful
      if (response.ok) {
          // Parse the response body as JSON
          const data = await response.json();
          console.log('Order data:', data);
          console.log('Order data:', data[0]._id);

          const url = `http://localhost:5001/api/orders/update/${data[0]._id}`;
          const token = Cookies.get('jwtToken');

          const changeddata = {
            firstname: values.firstName,
            lastname: values.lastName,
            nicNo: values.nicNo,
            brId: values.brId,
            email: values.email,
            phone: values.phone,
            address: values.address
          };
          console.log('Order data:', changeddata);

          try {
            const response = await axios.patch(url, changeddata, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            console.log('Response:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }

      } else if (response.status === 401) {
          // Handle unauthorized access
          console.error('Unauthorized!'); // You can add additional handling if needed
      } else {
          // Handle other error responses
          console.error('Error:', response.statusText);
      }
  };

const OrderEditContent = ({ orderData, onClose }: OrderEditProps) => (
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

      <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Order Editing Form</h3>

      <Formik
                initialValues={{
                    
                    firstName: orderData.firstname,
                    lastName: orderData.lastname,
                    nicNo: orderData.nicNo,
                    brId: orderData.brId,
                    email: orderData.email,
                    address: orderData.address,
                    phone: orderData.phone,

                }}
                validationSchema={SignUpSchema}
                onSubmit={handleRegister}
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
                        placeholder={orderData.firstname}
                        handleChange={handleChange}
                        values={values}
                      />
                      <InputFieldFilled
                        label="Last Name"
                        name="lastName"
                        type="text"
                        boxcolor="transparent"
                        placeholder={orderData.lastname}
                        handleChange={handleChange}
                        values={values}
                        icon="AccountCircle"
                      />
                    </div>


                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                      <InputFieldFilled
                        label="NIC"
                        name="nicNo"
                        type="text"
                        boxcolor="transparent"
                        placeholder={orderData.nicNo}
                        handleChange={handleChange}
                        values={values}
                        icon="ContactMail"
                      />
                      <InputFieldFilled
                        label="BR ID"
                        name="brId"
                        type="text"
                        boxcolor="transparent"
                        placeholder={orderData.brId}
                        handleChange={handleChange}
                        values={values}
                        icon="Nfc"
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
                        name="phone"
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


                    







                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                      
                      <PrimaryButton
                        type="submit"
                        onClick={() => handleRegister(values)}
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

function OrderEdit({ orderData, onClose }: OrderEditProps) {



   



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => 
      <OrderEditContent orderData={orderData} onClose={() => { onClose(); close(); }} />}
    </Popup>
  );
}

export default OrderEdit;
