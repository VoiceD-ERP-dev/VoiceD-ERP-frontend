import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from '../../FormElements/InputFiled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import SelectField from '../../FormElements/SelectField';
import CheckboxOne from '../../Checkboxes/CheckboxOne';
import TextField from '../../FormElements/TextFiled';


function CustomerRegister({userRole} : {userRole : string}) {


  const navigate = useNavigate();

  const SignUpSchema = Yup.object().shape({
    userName: Yup.string().required("Required"), 
    nic: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contact: Yup.string().required("Required"),
    userID: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
  });

  const handleRegister = () => {
    navigate("/");
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
                  nic: "",
                  brid: "",
                  email: "",
                  address: "",
                  contact: "",

                }}
                validationSchema={SignUpSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">


<div className='w-full '>
                      <h2>Self Regsitration Portal</h2>
                    </div>

                    <TextField 
                        label=""
                        name="portal"
                        type="text"
                        icon="AddLink"
                        boxcolor="transparent"
                        placeholder="voiced.lk/sid=?9076RtHYU6764/csr"
                       
                        
                      />



                    <div className='w-full flex flex-row justify-between space-x-3'>
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


                    <div className='w-full flex flex-row justify-between space-x-3'>
                      <InputField
                        label="NIC"
                        name="nic"
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



                    <div className='w-full flex flex-row justify-between space-x-3'>
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


                    <div className='w-full py-3 mt-5'>
                      <h2>Package Details</h2>
                    </div>
                    <div className='w-full flex flex-row justify-between space-x-3 '>

                      <SelectField
                        label="Select a Package"
                        name='Select a Package'
                        icon="Inventory"
                        boxcolor="transparent"
                        handleChange={handleChange}
                        options={["Basic", "Platinum", "Premium"]}
                      />

                     
                        <CheckboxOne
                          type='checkbox'
                          name="Select Startup fee"
                          label='Select Startup fee'
                          boxcolor="transparent"
                          icon="Inventory" />
                     


                    </div>



                    <div className='w-full flex flex-row justify-between space-x-3 '>

                      <SelectField
                        label="Select a Payment Method"
                        name='Select a Payment Method'
                        icon="Payments"
                        boxcolor="transparent"
                        handleChange={handleChange}
                        options={["Direct Purchase", "Bank Deposit", "Cheque"]}
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
        </div>


      </div>
    </DefaultLayout>
  )
}

export default CustomerRegister
