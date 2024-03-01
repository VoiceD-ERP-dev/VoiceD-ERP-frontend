import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import InputFileUpload from '../../FormElements/InputFileUpload';



interface InvoiceEditProps {
  invoiceData: {
   
    payementMethod: string;
    paymentProof: File | null;
   
    
  };
  onClose: () => void;
}



const SignUpSchema = Yup.object().shape({
  payementMethod: Yup.string(),
    
  });

  const handleRegister = () => {
    console.log('Registered');
  };

const InvoiceEditContent = ({ invoiceData, onClose }: InvoiceEditProps) => (
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

      <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Payment Method Submission</h3>

      <Formik
                initialValues={{
                  
                  paymentProof: null, 

                }}
                validationSchema={SignUpSchema}
                onSubmit={handleRegister}
              >



                {({ errors, touched, handleChange, values }) => (

                  <Form className=" w-full">






                    <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                      <InputFileUpload
                        label="Payment Proof"
                        name="payementMethod"
                        icon="AccountCircle"
                        boxcolor="transparent"
                        placeholder="paymentDoc"
                        type='file'
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

function PDInvoiceEdit({ invoiceData, onClose }: InvoiceEditProps) {



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => 
      <InvoiceEditContent InvoiceData={invoiceData} onClose={() => { onClose(); close(); }} />}
    </Popup>
  );
}

export default PDInvoiceEdit;
