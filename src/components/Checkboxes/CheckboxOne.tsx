import React, { useState } from "react";
import { ErrorMessage } from "formik";
import * as MuiIcons from '@mui/icons-material';

interface CheckBoxFieldProps {
  label: string;
  name: string;
  boxcolor: string;
  type: "text" | "password" | "email" | "button" | "submit" | "reset" | "checkbox" | undefined;
  icon: keyof typeof MuiIcons;
}

const CheckboxOne = ({ label, name, type, boxcolor, icon }: CheckBoxFieldProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const IconComponent = MuiIcons[icon];
  const iconwrapper = {
    backgroundColor: boxcolor,
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
      <label className="form-field-input-container w-full rounded-[6px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-start items-center">
        <div
          style={iconwrapper}
          className={`w-[44px] h-[44px] rounded-bl-[6px] rounded-tl-[6px] flex justify-center items-center`}
        >
          <IconComponent />
        </div>

        <div className="relative flex items-center ml-2">
          <input
            type={type}
            id={name}
            
            name={name}
            checked={isChecked}
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
            required
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border cursor-pointer ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
            ></span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default CheckboxOne;