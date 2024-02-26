import React, { ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage ,  useFormikContext } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import * as MuiIcons from '@mui/icons-material';




interface InputFileUploadProps{
    label: string;
    name : string;
    boxcolor : string;
    type:  "file";
    placeholder: string;
    
    icon: keyof typeof MuiIcons;
    onChange?: (event: any) => void
  }
  

function InputFileUpload({ label, name, type, placeholder,  boxcolor, icon ,onChange }: InputFileUploadProps) {

  const { setFieldValue } = useFormikContext();

    const IconComponent = MuiIcons[icon];
  const iconwrapper = {
    backgroundColor: boxcolor,
    
  }



  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFieldValue(name, event.currentTarget.files[0]);
    }
  };



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
        <input
          type="file"
          name={name}
  
          onChange={handleFileChange}
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

export default InputFileUpload;
