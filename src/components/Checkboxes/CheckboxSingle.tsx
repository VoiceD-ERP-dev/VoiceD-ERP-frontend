import React, { useState } from "react";
import { ErrorMessage } from "formik";
import * as MuiIcons from '@mui/icons-material';

interface CheckBoxFieldProps {
  name: string;
  boxcolor: string;
  type: "checkbox";
  icon: keyof typeof MuiIcons;
  handleChange: (checked: boolean) => void;
}

const CheckboxSingle = ({ name, boxcolor, type, icon, handleChange }: CheckBoxFieldProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const IconComponent = MuiIcons[icon];
  const iconwrapper = {
    backgroundColor: boxcolor,
  };

  const handleCheckboxChange = () => {
    const updatedCheckedState = !isChecked;
    setIsChecked(updatedCheckedState);
    handleChange(updatedCheckedState);
  };

  return (
    
      <label className="form-field-input-container w-auto rounded-[6px] h-[44px] flex flex-row justify-start items-center">

        <div className="relative flex items-center ml-2">
          <input
            type={type}
            id={name}
            checked={isChecked}
            className="sr-only"
            onChange={handleCheckboxChange}
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
      </label>
    
  );
};

export default CheckboxSingle;
