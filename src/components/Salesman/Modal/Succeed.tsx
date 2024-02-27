import React from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import CheckAnimation from './CheckAnimation';



interface SuceedProps {
  isOpen: boolean; // Add isOpen to the SuceedProps interface
  onClose: () => void;

}





const handleRegister = () => {
  console.log('Registered');
};

const SucceedContent = ({ onClose }: SuceedProps) => (
  <div className='w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20 '>
    <div className='modal p-5 bg-white dark:bg-black rounded-lg w-[50%] lg:w-[50%] h-auto border-[2px] border-[#b76bff]'>
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

      <div className='w-full flex justify-center items-center flex-col'>
        <h2 className='text-center'>Registration Succeed!</h2>
        <div className='md:w-full md:h-full flex justify-center items-center md:p-5 mx-auto  w-full relative'>
<CheckAnimation/>
        </div>
      </div>


    </div>
  </div>
);

function Succeed({ isOpen, onClose }: SuceedProps) {
  return (
    <Popup open={isOpen} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => <SucceedContent onClose={() => { onClose(); close(); }} />}
    </Popup>
  );
}

export default Succeed;
