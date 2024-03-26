import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import InputFileUpload from '../../FormElements/InputFileUpload';
import Cookies from 'js-cookie';
import axios from 'axios';



interface InvoiceEditProps {
  invoiceData: {
    customerNo: string;
    customerName: string;
    createdAt: string;
    invoiceNo: string;
    status: string;
    paymentType: string;
    agentNo: string;
    _id: string;
    paymentProof: File | null;
  };
  onClose: () => void;
}

const SignUpSchema = Yup.object().shape({
  paymentProof: Yup.mixed().required('Payment proof is required'),
});

const InvoiceEditContent: React.FC<InvoiceEditProps> = ({ invoiceData, onClose }) => {
  const handleRegister = async (values: any) => {
    try {
      const formData = new FormData();
      if (values.paymentProof) {
        formData.append('proofDoc', values.paymentProof);
        
        const response = await axios.patch(`http://localhost:5001/api/invoices/${invoiceData._id}/uploadProof`, formData);
        console.log('File uploaded successfully:', response.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20'>
      <div className='modal p-5 bg-white dark:bg-black rounded-lg md:w-[50%] lg:w-[50%] w-full max-h-150 border-[2px] border-[#b76bff] overflow-auto'>
        <div className='flex flex-row justify-end w-full'>
          <div className='close w-[22px] h-[22px] rounded-full bg-[#b76bff] text-[#ffffff] flex justify-center items-center cursor-pointer'>
            <FontAwesomeIcon
              onClick={() => {
                onClose();
              }}
              icon={faClose}
            />
          </div>
        </div>

        <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Payment Method Submission</h3>

        <Formik
          initialValues={{
            paymentProof: null,
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegister}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className='w-full'>
              <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                <InputFileUpload
                  label='Payment Proof'
                  name='paymentProof'
                  icon='AccountCircle'
                  boxcolor='transparent'
                  placeholder='paymentDoc'
                  type='file'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files) {
                      setFieldValue('paymentProof', event.target.files[0]);
                    }
                  }}
                />
                <ErrorMessage name='paymentProof' component='div' className='text-red-500 text-xs mt-1' />
              </div>

              <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                <PrimaryButton
                  type='submit'
                  textcolor='#fafafa'
                  label='Submit'
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
};

const InvoiceEdit: React.FC<InvoiceEditProps> = ({ invoiceData, onClose }) => {
  return (
    <Popup open modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close) => <InvoiceEditContent invoiceData={invoiceData} onClose={() => { onClose(); close(); }} />}
    </Popup>
  );
};

export default InvoiceEdit;