import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import ProfileEdit from '../components/Salesman/Modal/ProfileEdit';

const Profile = ({ userRole }: { userRole: string }) => {


  const [isProfileEditOpen, setProfileEditOpen] = useState(false);


  const handleEditClick = () => {
    setProfileEditOpen(true);
  };

  return (
    <DefaultLayout userRole={userRole}>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
              onClick={handleEditClick}
            >
           
              <span>
              <svg className='w-6 h-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path className='fill-white' d="M18.52 4l-1 1H2V4zM2 8v1h11.52l1-1zm4.52 8H2v1h3.655a1.477 1.477 0 0 1 .282-.417zM2 12v1h7.52l1-1zm20.95-6.066a.965.965 0 0 1 .03 1.385L9.825 20.471 5.73 22.227a.371.371 0 0 1-.488-.487l1.756-4.097L20.15 4.491a.965.965 0 0 1 1.385.03zM9.02 19.728l-1.28-1.28-.96 2.24zM20.093 8.79L18.68 7.376 8.382 17.674l1.413 1.414zm1.865-2.445l-.804-.838a.42.42 0 0 0-.6-.007l-1.167 1.17L20.8 8.083l1.152-1.151a.42.42 0 0 0 .006-.587z"/>
              <path fill="none" d="M0 0h24v24H0z"/></svg>
              </span>
              <span>Edit Profile</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              Supun Rathnayaka
            </h3>
            <p className="font-medium">Agent ID : VD-00028sa24</p>


            <div className="mx-auto max-w-180 mt-5 mb-5">
              <h4 className="font-semibold text-black dark:text-white">
                Profile Bio
              </h4>



            </div>

            <div className='w-full flex flex-col '>
           
                <div className='flex flex-row  h-[44px]  rounded-md w-1/2 justify-start items-center px-3'>
                  <span>First Name : </span>
                  <h3 className='ml-3 '>Supun</h3>
                </div>

                <div className='flex flex-row  h-[44px]  rounded-md w-1/2 justify-start items-center px-3'>
                  <span>Last Name : </span>
                  <h3 className='ml-3 '>Rathnayaka</h3>
                </div>

                <div className='flex flex-row  h-[44px]  rounded-md w-1/2 justify-start items-center px-3'>
                  <span>Contact Number : </span>
                  <h3 className='ml-3 '>0778505055</h3>
                </div>

                <div className='flex flex-row  h-[44px]  rounded-md w-1/2 justify-start items-center px-3'>
                  <span>Email : </span>
                  <h3 className='ml-3 '>supun.rathnayaka@voiced.lk</h3>
                </div>
              

             

                {isProfileEditOpen && (
  <ProfileEdit

    onClose={() => setProfileEditOpen(false)}
 
    
  />
)}

            </div>


          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
