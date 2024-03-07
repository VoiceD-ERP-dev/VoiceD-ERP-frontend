import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../Forms/SelectGroup/SelectGroupOne';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import InputField from '../../FormElements/InputFiled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import SelectField from '../../FormElements/SelectField';
import CheckboxOne from '../../Checkboxes/CheckboxOne';
import TextField from '../../FormElements/TextFiled';
import InputFileUpload from '../../FormElements/InputFileUpload';
import Cookies from 'js-cookie';
import Succeed from '../Modal/Succeed';
import { useState } from 'react';
import PackageCards from '../../../pages/UiElements/PackageCards';


type CustomerFormValuesType = {
  firstName: string;
  lastName: string;
  nicNo: string;
  brid: string;
  email: string;
  address: string;
  contact: string;
  package: string;
  payment: string;
  nicDoc: File | null;
  brDoc: File | null;
  otherDoc: File | null;
};


function SocialPackages({ userRole }: { userRole: string }) {

  const [showSucceedModal, setShowSucceedModal] = useState(false);
  const navigate = useNavigate();

  const CustomerRegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    nicNo: Yup.string().required("Required"),
    brid: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    package: Yup.string().required("Required"),
    payment: Yup.string().required("Required"),
    contact: Yup.string()
      .min(10, "must include a valid mobile number")
      .matches(/[0-9]/, "must includes only digits")
      .required("Required"),

  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: CustomerFormValuesType, { resetForm }: FormikHelpers<CustomerFormValuesType>): Promise<void> => {
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
      registrationData.append('invoice[0][paymentType]', values.payment || "Card");
      registrationData.append('invoice[0][order][description]', "Order for invoice for A");
      registrationData.append('invoice[0][package][package]', values.package || "Basic");
      registrationData.append('invoice[0][package][startupFee]', "2990");

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
      const response = await fetch('https://voiced-erp-backend.onrender.com/api/customers/cv', {
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
  };



  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };



  return (
    <DefaultAdminLayout userRole={userRole}>
      <Breadcrumb pageName="Social Media Packages" />

      <div className="w-full gap-9 sm:grid-cols-2 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Customer Regsitration Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">

            <div className="p-6.5">

              <h2 className='text-[#2d2d2d] font-semibold text-[16px] dark:text-[#fafafa] mb-2'>Epic Packages</h2>
              <div className='w-full flex flex-wrap justify-center'>



                <PackageCards
                  packageName='1 Year Package'
                  price='3000'
                  features={['Graphic Post Design 5', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#84cc16'
                  colorVia='#4ade80'
                  colorTo='#2dd4bf'
                />

                <PackageCards
                  packageName='1 Month Package'
                  price='7000'
                  features={['Graphic Post Design 10', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable','20% Service charge of Ad Amount']}
                  colorfrom='#a78bfa'
                  colorVia='#d8b4fe'
                  colorTo='#f0abfc'
                />

                <PackageCards
                  packageName='AD Campaign'
                  price='12000'
                  features={['Graphic Post Design 1', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable','20% Service charge of Ad Amount']}
                  colorfrom='#facc15'
                  colorVia='#fbbf24'
                  colorTo='#fb923c'
                />






              </div>

              <h2 className='text-[#2d2d2d] font-semibold text-[16px] dark:text-[#fafafa] mb-2 mt-2'>Common Packages</h2>
              <div className='w-full flex flex-wrap justify-center'>



                <PackageCards
                  packageName='Basic'
                  price='3000'
                  features={['Graphic Post Design 5', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#9333ea'
                  colorVia='#6366f1'
                  colorTo='#d946ef'
                />

                <PackageCards
                  packageName='Platinum'
                  price='7000'
                  features={['Graphic Post Design 10', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#f43f5e'
                  colorVia='#f87171'
                  colorTo='#ec4899'
                />

                <PackageCards
                  packageName='Premium'
                  price='12000'
                  features={['Graphic Post Design 15', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#0ea5e9'
                  colorVia='#22d3ee'
                  colorTo='#34d399'
                />






              </div>


            </div>
          </div>
        </div>

        <Succeed isOpen={showSucceedModal} onClose={handleCloseModal} />
      </div>
    </DefaultAdminLayout>
  )
}

export default SocialPackages
