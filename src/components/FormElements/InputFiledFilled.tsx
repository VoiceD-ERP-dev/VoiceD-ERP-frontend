import React, { ChangeEventHandler } from "react";
import { Field, ErrorMessage } from "formik";
import * as MuiIcons from '@mui/icons-material';

interface InputFieldProps {
  label: string;
  name: string;
  boxcolor: string;
  type: "text" | "password" | "email" | "button" | "submit" | "reset" | undefined;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  values: { [key: string]: string };
  icon: keyof typeof MuiIcons;
  editable?: boolean;
}

function InputFieldFilled({ label, name, type, placeholder, boxcolor, icon, values, handleChange, editable = true }: InputFieldProps) {
  const IconComponent = MuiIcons[icon];
  const iconwrapper = {
    backgroundColor: boxcolor,
  };

  const inputComponent = (
    <Field
      type={type}
      name={name}
      value={values[name]}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[14px] form-control form-field-input"
      required
    />
  );

  return (
    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
      <div className="form-field-label flex justify-between w-full ">
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
        <div style={iconwrapper} className="w-[44px] h-[44px] rounded-bl-[6px] rounded-tl-[6px] flex justify-center items-center">
          <IconComponent />
        </div>
        {editable ? inputComponent : <div className="w-full px-2">{values[name]}</div>}
      </div>
      <ErrorMessage
          name={name}
          component="span"
          className="text-red-600 text-[12px] md:hidden"
        />
    </div>
  );
}

export default InputFieldFilled;
