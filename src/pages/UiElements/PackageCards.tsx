import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";


interface PackageCardsProps{
  packageName: string,
  price: string,
}


function PackageCards({ packageName , price} : PackageCardsProps) {
  return (
    <div className='p-2 md:w-1/4 w-full '>
      <div className='flex flex-col space-y-8 border-[1px] border-[#565656] border-opacity-25 rounded-tr-2xl rounded-bl-2xl items-center p-5 bg-white w-full'>

        <h2 className='text-[1.5rem] font-semibold bg-gradient-to-r from-purple-600 via-indigo-400 to-fuchsia-500  inline-block text-transparent bg-clip-text'>{packageName}</h2>
        <div className='w-[70%] mx-auto text-center leading-none'>
          <p className='text-[12px] text-[#2b2b2b]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, accusamus?</p>
        </div>

        <div className='w-[70%] mx-auto text-center items-center  h-auto relative flex flex-col justify-center'>
          <span><span className='text-[1rem] text-[#2b2b2b]'>LKR</span><span className='text-[3.5rem] font-bold bg-gradient-to-r from-purple-600 via-indigo-400 to-fuchsia-500 text-transparent bg-clip-text'>{price}</span><span className='text-[1rem] text-[#2b2b2b]'>.00</span></span>
          <span className='text-[14px]'>per month</span>
        </div>

        <div className='w-full mx-auto text-center items-center   h-auto relative flex flex-col justify-center'>
          <ul className='w-full flex flex-col space-y-2 items-center'>
            <li className='flex flex-row justify-start space-x-3'>
              <CheckCircleOutlineIcon className='text-purple-600' /><h4 className='text-[14px] text-[#2b2b2b]'>Feature 1</h4>
            </li>
            <li className='flex flex-row justify-start space-x-3'>
              <CheckCircleOutlineIcon className='text-purple-600' /> <h4 className='text-[14px] text-[#2b2b2b]'>Feature 2</h4>
            </li>
          </ul>
        </div>



      </div>
    </div>
  )
}

export default PackageCards
