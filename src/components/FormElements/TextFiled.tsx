import React, { ChangeEventHandler } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import * as MuiIcons from '@mui/icons-material';



interface TextFieldProps {
    label: string;
    name : string;
    boxcolor : string;
    type: "text" | "password" | "email" | "button" | "submit" | "reset" | undefined;
    placeholder: string;
    icon: keyof typeof MuiIcons;
  }
  

function TextField({ label, name, type, placeholder, boxcolor, icon }: TextFieldProps) {

    const IconComponent = MuiIcons[icon];
  const iconwrapper = {
    backgroundColor: boxcolor,
    
  }


  return (

    

    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
      <div className="form-field-label flex justify-between w-full ">
        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold dark:text-green-600">
          {label}
        </span>
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-600 text-[12px]"
        />
      </div>
      <div className="form-field-input-container w-full rounded-[6px] h-[44px] bg-green-300 border-[1px] border-green-600 border-opacity-20 flex flex-row justify-between items-center">
       
       <div 
       style={iconwrapper}
       className={`w-[44px] h-[44px] rounded-bl-[6px] rounded-tl-[6px] flex justify-center items-center text-green-600`}>
<IconComponent/>
       </div>
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          readOnly
          className="w-full h-full p-2 bg-transparent outline-none text-green-600 text-[14px] font-semibold cursor-pointer form-control form-field-input"
          
        />
      </div>
    </div>




   
  );
}

export default TextField;
