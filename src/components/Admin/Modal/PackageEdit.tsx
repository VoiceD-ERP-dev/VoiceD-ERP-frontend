import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PrimaryButton from '../../FormElements/PrimaryButon';



interface PackEditContentProps {
  packDataItem?: {
    packageName: string;
    price: string;
    features:string[],
  notes:string[],
  colorfrom: string,
  colorTo: string,
  colorVia: string,
  };
  onClick: () => void;
  onClose: () => void;

}



const PackageSchema = Yup.object().shape({
  packageName: Yup.string(),
  price: Yup.string(),


});





const PackEditContent = ({ packDataItem, onClose }: PackEditContentProps) => {



  const [showDecisionPop, setShowDecisionPop] = React.useState<{ isOpen: boolean }>({ isOpen: false });

  const handleEdit = (values: { packageName: string; price: string }) => {
    console.log('Registered', values);
  };


  return (

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

        <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Invoice Payment Clearance</h3>

        <Formik
          initialValues={{
            packageName: "",
            price: "",
          }}
          validationSchema={PackageSchema}
          onSubmit={handleEdit}

        >



          {({ errors, touched, handleChange, values }) => (

            <>
              {packDataItem && (
                <Form className="w-full">
                  <div className='w-full flex flex-col justify-between space-y-3'>
                    <div className='flex flex-col mt-2 space-y-1'>
                      <table className='md:w-1/2 w-full'>
                        <tr>
                          <td className=''>
                            <span className='font-semibold uppercase md:text-[14px] text-[12px]'>Invoice ID :</span>
                          </td>
                          <td>
                            <span className=' md:text-[14px] text-[12px]'> {packDataItem.packageName}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className=''>
                            <span className='font-semibold uppercase md:text-[14px] text-[12px]'>Invoice Date :</span>
                          </td>
                          <td>
                            <span className=' md:text-[14px] text-[12px]'> {packDataItem.price}</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>
                    <PrimaryButton
                      label='Submit'
                      type='submit'
                      colorfrom='#c026d3'
                      colorto='#a855f7'
                      textcolor='#f5f5f5'
                    />
                  </div>
                </Form>
              )}
            </>



          )}




        </Formik>



      </div>
    </div>
  );

};

function PackEdit({ packDataItem, onClose }: PackEditContentProps) {



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => (
        <PackEditContent packDataItem={packDataItem} onClose={() => { onClose(); close(); }} />
      )}
    </Popup>
  );
}

export default PackEdit;
