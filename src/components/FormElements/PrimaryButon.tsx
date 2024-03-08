import React, { MouseEventHandler , CSSProperties} from 'react';

interface PrimaryButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  eventname?: MouseEventHandler<HTMLButtonElement>;
  bgcolor: string;
  colorfrom: string,
  colorto: string,
  borderSize: string
  textcolor: string,
  borderColor: string,
  darktext: string,
  hoverbg: string,
  type: 'button' | 'submit' | 'reset' | undefined; 
}

function PrimaryButton({ label, eventname, bgcolor, textcolor, type, colorfrom , colorto, borderSize, borderColor, hoverbg , onClick }: PrimaryButtonProps) {
  const buttonStyle = {
    backgroundColor: bgcolor,
    color: textcolor,
    border: `${borderSize} solid ${borderColor}`,
  
  };


  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colorfrom}, ${colorto})`,
  };


  const hoverStyle: CSSProperties = {
    backgroundColor: hoverbg,
  };


  const handleClick : MouseEventHandler<HTMLButtonElement> = (e) => {

    if(onClick){
      onClick(e);
    }
    if(eventname){
      eventname(e);
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`w-full rounded-md h-[44px] mt-3 `}
      style={{ ...buttonStyle, ...gradientStyle,}}
    >
      <style>{`.primary-button:hover { background-color: ${hoverbg}; }`}</style>
      {label}
    </button>
  );
}

export default PrimaryButton;



