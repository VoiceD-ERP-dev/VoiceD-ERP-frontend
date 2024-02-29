import React, { ChangeEventHandler, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import * as MuiIcons from '@mui/icons-material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";



interface InputFieldProps {
    label: string;
    name : string;
    boxcolor : string;
    type: "text" | "password" | "email" | "button" | "submit" | "reset" | undefined;
    placeholder: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    values: { [key: string]: string };
    icon: keyof typeof MuiIcons;
  }
  

function InputFieldPassword({ label, name, type, placeholder, handleChange, values, boxcolor, icon }: InputFieldProps) {

    const IconComponent = MuiIcons[icon];
  const iconwrapper = {
    backgroundColor: boxcolor,
    
  }


  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



  return (

  



<div className="form-field-container flex flex-col sm:mt-5 mt-2 space-y-2 w-full">
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
                <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
                <div 
        style={iconwrapper}
        className={`w-[44px] h-[44px] rounded-bl-[6px] rounded-tl-[6px] flex justify-center items-center`}>
 <IconComponent/>
        </div>
                  <Field
                    className="form-field-input w-[90%] h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px]"
                    type={passwordVisible ? 'text' : 'password'}
                    name={name}
                    value={values[name]}
                    onChange={handleChange}
                    required
                  />
                  <div className="h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                    {passwordVisible ? (
                      <span
                        className="text-[16px] text-[#b758ef] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </span>
                    ) : (
                      <span
                        className="text-[16px] text-[#b758ef] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </span>
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name={name}
                  component="span"
                  className="text-red-600 text-[12px] block sm:hidden"
                />
              </div>




   
  );
}

export default InputFieldPassword;
