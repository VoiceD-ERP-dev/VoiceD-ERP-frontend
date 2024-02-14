import React, { MouseEventHandler } from 'react';

interface PrimaryButtonProps {
  label: string;
  eventname: MouseEventHandler<HTMLButtonElement>;
  bgcolor: string;
  colorfrom: string,
  colorto: string,
  textcolor: string;
  type: 'button' | 'submit' | 'reset' | undefined; 
}

function PrimaryButton({ label, eventname, bgcolor, textcolor, type, colorfrom , colorto }: PrimaryButtonProps) {
  const buttonStyle = {
    backgroundColor: bgcolor,
    color: textcolor,
    
  };


  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colorfrom}, ${colorto})`,
  };

  return (
    <button
      type={type}
      onClick={eventname}
      className={`w-full rounded-md h-[44px] mt-3  `}
      style={{ ...buttonStyle, ...gradientStyle }}
    >
      {label}
    </button>
  );
}

export default PrimaryButton;



