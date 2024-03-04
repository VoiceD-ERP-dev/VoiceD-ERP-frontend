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
  isOpen: boolean;
  onClose: () => void;
  values: {
    reason: string;
    decision: string;
  };
}



const handleRegister = () => {
  console.log('Registered');
};

const DecisionContent: React.FC<SuceedProps> = ({ onClose, isOpen, values }) => {

  return(
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
        <h2 className='text-center'>Are you sure?</h2>
        <p>Note : This process is can not be undone once you select "YES" &n</p>

        <div className='w-full mt-2 flex flex-row space-x-3'>
<PrimaryButton
label='Yes'
bgcolor='transparent'
type='submit'
textcolor='#161616'
/>


<PrimaryButton
label='No'
colorfrom='#c026d3'
colorto='#a855f7'
type='button'
textcolor='#161616'
eventname={() => {
  onClose();
}}
/>


        </div>

        
      </div>


    </div>
  </div>
  );
  
};

function DecisionPop({ isOpen, onClose }: SuceedProps) {
  return (
    <Popup open={isOpen} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => <DecisionContent onClose={() => { onClose(); close(); }}  />}
    </Popup>
  );
}

export default DecisionPop;
