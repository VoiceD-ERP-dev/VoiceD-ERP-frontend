import React, { MouseEventHandler , CSSProperties} from 'react';

interface PrimaryButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  eventname?: MouseEventHandler<HTMLButtonElement>; // Add eventname prop
  bgcolor: string;
  textcolor: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  colorfrom: string;
  colorto: string;
  borderSize: string;
  borderColor: string;
  hoverbg: string;
}

function PrimaryButton({
  label,
  onClick,
  eventname, // Include eventname prop
  bgcolor,
  textcolor,
  type = 'button',
  colorfrom,
  colorto,
  borderSize,
  borderColor,
  hoverbg,
}: PrimaryButtonProps) {
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

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    // Call both onClick and eventname if they are defined
    if (onClick) {
      onClick(e);
    }
    if (eventname) {
      eventname(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick} // Use handleClick to call both event handlers
      className="w-full rounded-md h-12 mt-3" // Adjust class name accordingly
      style={{ ...buttonStyle, ...gradientStyle }}
    >
      <style>{`.primary-button:hover { background-color: ${hoverbg}; }`}</style>
      {label}
    </button>
  );
}

export default PrimaryButton;


