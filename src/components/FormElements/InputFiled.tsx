import React, { ChangeEventHandler } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import * as MuiIcons from '@mui/icons-material';
// YourComponent.ts

import { CustomerFormValuesType } from './CustomerFormValuesType';

// Now you can use CustomerFormValuesType in this file



interface InputFieldProps {
  label: string;
  name: keyof CustomerFormValuesType; // Use keyof to specify keys from CustomerFormValuesType
  boxcolor: string;
  type: "text" | "password" | "email" | "button" | "submit" | "reset" | undefined;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  values: CustomerFormValuesType; // Change the type here
  icon: keyof typeof MuiIcons;
}

  

function InputField({ label, name, type, placeholder, handleChange, values, boxcolor, icon }: InputFieldProps) {

    const IconComponent = MuiIcons[icon];
  const iconwrapper = {
    backgroundColor: boxcolor,
    
  }


  return (

    

    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
      <div className="form-field-label sm:flex justify-between w-full hidden">
        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold dark:text-white">
          {label}
        </span>
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-600 text-[12px]"
        />
      </div>
      <div className="form-field-input-container w-full rounded-[6px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-between items-center">
       
       <div 
       style={iconwrapper}
       className={`w-[44px] h-[44px] rounded-bl-[6px] rounded-tl-[6px] flex justify-center items-center`}>
<IconComponent/>
       </div>
        <Field
          type={type}
          name={name}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[14px] form-control form-field-input"
          required
        />
      </div>
      <ErrorMessage
          name={name}
          component="span"
          className="text-red-600 text-[12px] md:hidden"
        />
    </div>




   
  );
}

export default InputField;
