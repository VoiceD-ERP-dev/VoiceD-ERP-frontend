import React , {useState} from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


interface PackageCardsProps {
  packageName: string;
  price: string;
  features: string[];
  colorfrom: string;
  colorVia: string;
  colorTo: string;
  notes: string[];
  onClick: () => void;
}


function PackageCardsEdit({ packageName, price, features, colorfrom, colorTo, colorVia, notes, onClick }: PackageCardsProps) {

  const [isHovered, setIsHovered] = useState(false);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colorfrom},${colorVia}, ${colorTo})`,
    color: isHovered ? '#ffffff' : '',
    transition: 'transform 0.5s ease-in-out',
  };

  const gradientStyleRadial = {
    backgroundImage: `radial-gradient(circle, ${colorfrom}, ${colorVia}, ${colorTo})`,
  };

  const textStyle = {
    color: isHovered ? '#ffffff' : `${colorfrom}`,
    transition: 'transform 0.5s ease-in-out',
  };

  const effectStyle = {
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.5s ease-in-out',
  };

  const textEffectStyle = {
    color: isHovered ? '#ffffff' : `#161616`,
    transition: 'transform 0.5s ease-in-out',
    // transitionDelay: isHovered ? '0.5s' : '0s',
    
  }
  const overlayEffectStyle = {
    // hover effect for packoverlay
    transform: isHovered ? 'scale(52)' : 'scale(1)',
    transition: 'transform 0.5s ease-in-out',
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='p-2 md:w-1/4 w-full flex' onClick={onClick}>
      <div className='packcard flex flex-col space-y-8 border-[1px] border-[#565656] border-opacity-25 
      relative overflow-hidden hover:shadow-lg hover:shadow-slate-300 dark:hover:shadow-slate-900
      rounded-tr-2xl rounded-bl-2xl items-center p-5 bg-white w-full'
      style={{...effectStyle}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >

        <h2 className='text-[1.5rem] font-semibold h-[1.8rem] text-transparent bg-clip-text z-9'
        style={{ ...gradientStyle,}}
        
        >{packageName}</h2>
        <div className='w-[70%] mx-auto text-center leading-none z-9'>
          <p className='text-[12px] text-[#2b2b2b]'
          style={{...textEffectStyle}}>Digital Business Solutions by VoiceD Digital Garage</p>
        </div>

        <div className='w-[70%] mx-auto text-center items-center  h-auto relative flex flex-col justify-center z-9'>
          <span><span className='text-[1rem] text-[#2b2b2b]'
          style={{...textEffectStyle}}>LKR</span><span className='text-[3.5rem] font-bold text-transparent bg-clip-text'
          style={{ ...gradientStyle,}}
          >{price}</span><span className='text-[1rem] text-[#2b2b2b]' style={{...textEffectStyle}}>.00</span></span>
          <span className='text-[14px]' 
          style={{...textEffectStyle}}>per month</span>
        </div>

        <div className='w-full mx-auto text-center items-center   h-auto relative flex flex-col justify-center z-9'>
          <ul className='w-full flex flex-col space-y-2 items-start justify-start'>
            {features.map((featureItem, index) => (

              <li className='flex flex-row justify-start space-x-3' key={index}>
                <CheckCircleOutlineIcon  
                style={{ ...textStyle,}}
                /><h4 className='text-[14px] text-[#2b2b2b] text-left' 
                style={{...textEffectStyle}}
                >{featureItem}</h4>
              </li>
            ))}


          </ul>
        </div>


        <div className='w-full mx-auto text-center items-center   h-auto relative flex flex-col justify-center z-9 border-t-[1px] border-[#565656] border-opacity-25'>
          <ul className='w-full flex flex-col items-center justify-start'>
            {notes.map((notesItem, index) => (

              <li className='flex flex-row justify-start space-x-3' key={index}>
              <h4 className='text-[12px] font-semibold text-[#2b2b2b] text-left' 
                style={{...textEffectStyle}}
                >{notesItem}</h4>
              </li>
            ))}


          </ul>
        </div>





      
      
      <div 
      
      className='packoverlay w-[25px] h-[25px] rounded-full absolute -bottom-8 right-0 '
      style={{ ...gradientStyleRadial,...overlayEffectStyle}}
      >

      </div>
      
      </div>
    </div>
  )
}

export default PackageCardsEdit
