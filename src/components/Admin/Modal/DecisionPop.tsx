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
        <div className='w-[108px] h-[108px] bg-red-50 flex justify-center items-center mx-auto p-5  mb-2 rounded-full'>
        <svg className='w-8 h-8 fill-red-500' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z"/>
          <path d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619zM422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.292 0-51.2 22.987-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z"/>
          <path d="M496.004 410.821v460.964c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V410.821c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-192.435 1.767l39.936 460.964c.976 11.269 10.903 19.612 22.171 18.636s19.612-10.903 18.636-22.171l-39.936-460.964c-.976-11.269-10.903-19.612-22.171-18.636s-19.612 10.903-18.636 22.171zm377.856-3.535l-39.936 460.964c-.976 11.269 7.367 21.195 18.636 22.171s21.195-7.367 22.171-18.636l39.936-460.964c.976-11.269-7.367-21.195-18.636-22.171s-21.195 7.367-22.171 18.636z"/>
        </svg>
        </div>
        <h2 className='text-center text-[#161616] dark:text-[#fafafa] font-semibold text-[16px] md:text-[24px]'>Are you sure?</h2>
        
        <div className='w-full mt-5 py-5 border-t-[1px] border-b-[1px] border-[#565656] border-opacity-25 flex justify-center items-center'>
        <p>Note : This process is can not be undone once you select "YES"</p>
        </div>
        
       

        <div className='w-full mt-2 flex flex-row justify-end items-end'>

          <div className='w-1/2 flex flex-row space-x-3 '>
          <button

className={`w-full rounded-md h-[44px] mt-3 bg-transparent text-[#161616] dark:text-[#fafafa] border-[1px]
 border-red-600 hover:bg-red-600 hover:text-[#fafafa] transition-all duration-200`}> Yes </button>


<PrimaryButton
label='No'
type='button'
bgcolor='#a855f7'
textcolor='#fafafa'
eventname={() => {
  onClose();
}}
/>

          </div>


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
