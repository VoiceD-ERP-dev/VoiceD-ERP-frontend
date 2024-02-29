import React, { ChangeEventHandler } from "react";
import { Field, ErrorMessage } from "formik";
import * as MuiIcons from "@mui/icons-material";

interface SelectFieldProps {
  label: string;
  name: string;
  boxcolor: string;
  icon: keyof typeof MuiIcons;
  options: string[];
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  values: { [key: string]: string };
}

function SelectField({
  label,
  name,
  boxcolor,
  icon,
  options,
  handleChange,
  values,
}: SelectFieldProps) {
  const IconComponent = MuiIcons[icon];
  const iconWrapperStyle = {
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
      <div className="form-field-input-container w-full rounded-[6px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-between items-center">
        <div
          style={iconWrapperStyle}
          className="w-[44px] h-[44px] rounded-bl-[6px] rounded-tl-[6px] flex justify-center items-center"
        >
          <IconComponent />
        </div>
        <Field
          as="select"
          name={name}
          className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input cursor-pointer"
          onChange={handleChange}
          value={values[name]}
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="w-full p-2">
              {option}
            </option>
          ))}
        </Field>
      </div>
    </div>
  );
}

export default SelectField;
