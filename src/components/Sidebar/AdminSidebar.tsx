import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import LogoWhite from '../../images/logo/logo-white.png';
import LogoDark from '../../images/logo/logo.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  userRole: string | null;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, userRole }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden 
      bg-[#ffffff] 
       ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={LogoWhite} alt="LogoWhite" className='hidden dark:block' />
          <img src={LogoDark} alt="LogoDark" className='dark:hidden block' />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto  ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-bold text-[#161616] dark:text-[#fafafa] ">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">

              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('adminDashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] ${(pathname === '/' ||
                          pathname.includes('adminDashboard')) &&
                          'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:text-[#fafafa] text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Dashboard
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/adminDashboard"
                              className=
                              'group relative flex hover:text-[#a855f7]  items-center gap-2.5 rounded-md px-4  font-medium  ease-in-out  dark:text-[#fafafa] text-[#161616]'

                            >
                              My Dashboard
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>





              <SidebarLinkGroup
                activeCondition={
                  pathname === '/customers' || pathname.includes('customers')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium text-[#161616] dark:text-[#ffffff] duration-300 ease-in-out hover:bg-[#b76bff] dark:hover:bg-meta-4 ${(pathname === '/customers' ||
                          pathname.includes('customers')) &&
                          'bg-[#b76bff] dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >


                        <svg className="w-6 h-6 text-gray-800 dark:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path className='fill-black dark:fill-white' d="M12 1.2A4.8 4.8 0 1 0 16.8 6 4.805 4.805 0 0 0 12 1.2zm0 8.6A3.8 3.8 0 1 1 15.8 6 3.804 3.804 0 0 1 12 9.8zM20 22H4v-4.5A5.506 5.506 0 0 1 9.5 12h5a5.506 5.506 0 0 1 5.5 5.5zM5 21h14v-3.5a4.505 4.505 0 0 0-4.5-4.5h-5A4.505 4.505 0 0 0 5 17.5z" />
                          <path fill="none" d="M0 0h24v24H0z" /></svg>




                        Customers
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/customers/customer-registration"
                              className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('customer-registration') &&
                                'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                }`}
                            >

                              Customer Registration
                            </NavLink>
                          </li>

                          {/* <li>

                         



<NavLink
  to="/customers/customer-insight"
  className={`group relative flex items-center gap-2.5 hover:text-[#a855f7] py-2 px-4 rounded-md font-medium dark:text-[#fafafa] ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
    ${pathname.includes('customer-insight') &&
      'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
    }`}
  onClick={(e) => {
    // Prevent default behavior to stop navigation
    e.preventDefault();

    // Check userRole and log "Access Denied" if it's 'admin'
    if (userRole === 'admin') {
      console.log("Access Denied");
    } else {
      // Continue with navigation if the userRole is not 'admin'
      sidebarExpanded ? handleClick() : setSidebarExpanded(true);
    }
  }}
>
  Customer Insight
</NavLink>



                          </li> */}




                          <li>
                            <NavLink
                              to="/customers/customer-insight"
                              className={`group relative flex items-center gap-2.5 hover:text-[#a855f7] py-2 px-4 rounded-md font-medium dark:text-[#fafafa] ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
        ${pathname.includes('customer-insight') &&
                                'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                }`}
                            >
                              Customer Insight
                            </NavLink>
                          </li>





                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>



              <SidebarLinkGroup
                activeCondition={
                  pathname === '/invoices' || pathname.includes('invoices')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4  font-medium text-[#161616] dark:text-[#ffffff] duration-300 ease-in-out hover:bg-[#b76bff] dark:hover:bg-meta-4 ${(pathname === '/customers' ||
                          pathname.includes('invoices')) &&
                          'bg-[#b76bff] dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        {/* <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="1" d="M6 10h12v1H6zM3 1h12.29L21 6.709V23H3zm12 6h5v-.2L15.2 2H15zM4 22h16V8h-6V2H4zm2-7h12v-1H6zm0 4h9v-1H6z"/><path fill="none" d="M0 0h24v24H0z"/></svg> */}


                        <svg className="w-6 h-6 text-gray-800 dark:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path className='fill-black dark:fill-white' d="M6 10h12v1H6zM3 1h12.29L21 6.709V23H3zm12 6h5v-.2L15.2 2H15zM4 22h16V8h-6V2H4zm2-7h12v-1H6zm0 4h9v-1H6z" />
                          <path fill="none" d="M0 0h24v24H0z" />
                        </svg>

                        Invoices
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/invoices/pd-invoices"
                              className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('pd-invoices') &&
                                'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                }`}
                            >

                              Pending Invoices
                            </NavLink>
                          </li>
                          <li>

                            <NavLink
                              to="/invoices/accepted-invoices"
                              className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('accepted-invoices') &&
                                'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                }`}
                            >

                              Accepted Invoices
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <h3 className="mb-4 mt-4 ml-4 text-sm font-bold text-[#161616] dark:text-[#fafafa] ">
                COMPANY ROLES
              </h3>


              <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4  font-medium text-[#161616] dark:text-[#ffffff] duration-300 ease-in-out hover:bg-[#b76bff] dark:hover:bg-meta-4 ${(pathname === '/customers' ||
                          pathname.includes('auth')) &&
                          'bg-[#b76bff] dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >

                        <svg className="w-6 h-6 text-gray-800 dark:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path className='fill-black dark:fill-white' d="M20.76 3.854l-.87-.042c-3.31-.166-5.67-.934-7.21-2.35L12 .838l-.68.624c-1.54 1.416-3.9 2.184-7.209 2.35l-.87.042-.08.87c-.574 6.312-.029 13.382 8.358 17.957l.481.262.48-.262c8.388-4.575 8.933-11.645 8.36-17.958zm-8.762 17.95c-7.879-4.3-8.381-11.005-7.837-16.993 3.552-.178 6.122-1.033 7.842-2.613 1.72 1.58 4.287 2.438 7.84 2.615.544 5.99.034 12.692-7.845 16.99zm5.524-13.946l.637.636L10.5 16 7 12.689l.637-.636 2.863 2.674z" />
                          <path fill="none" d="M0 0h24v24H0z" /></svg>



                        User Authentications
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/auth/super-admin"
                              className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('super-admin') &&
                                'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                }`}
                            >

                              Super Admin
                            </NavLink>
                          </li>
                          <li>

                            <NavLink
                              to="/auth/sub-admin"
                              className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('sub-admin') &&
                                'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                }`}
                            >

                              Sub Admin
                            </NavLink>
                          </li>

                          <li>

                            <NavLink
                              to="/auth/sales-agents"
                              className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('sales-agents') &&
                                'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                }`}
                            >

                              Sales Agents
                            </NavLink>
                          </li>


                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>


              {userRole === 'superadmin' && (

                <>

                  <h3 className="mb-4 mt-4 ml-4 text-sm font-bold text-[#161616] dark:text-[#fafafa] ">
                    SETTINGS
                  </h3>


                  <SidebarLinkGroup
                    activeCondition={
                      pathname === '/settings' || pathname.includes('settings')
                    }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <NavLink
                            to="#"
                            className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4  font-medium text-[#161616] dark:text-[#ffffff] duration-300 ease-in-out hover:bg-[#b76bff] dark:hover:bg-meta-4 ${(pathname === '/customers' ||
                              pathname.includes('settings')) &&
                              'bg-[#b76bff] dark:bg-meta-4'
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >



                            <svg version="1.1" id="SETTINGS" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink"
                              className="w-6 h-6 text-gray-800 dark:text-white" viewBox="0 0 1800 1800" enable-background="new 0 0 1800 1800" xml: space="preserve" fill='none'>
                              <g>
                                <path className='fill-black dark:fill-white' d="M1468.436,32.467v188.211c-98.748,15.249-174.595,100.822-174.595,203.777s75.847,188.521,174.595,203.777
		v1139.302c0,17.453,14.146,31.608,31.607,31.608c17.454,0,31.609-14.155,31.609-31.608V628.232
		c98.748-15.257,174.59-100.822,174.59-203.777s-75.842-188.529-174.59-203.777V32.467c0-17.454-14.155-31.608-31.609-31.608
		C1482.581,0.858,1468.436,15.013,1468.436,32.467z M1643.029,424.455c0,67.979-47.703,124.986-111.377,139.423
		c-10.179,2.302-20.744,3.563-31.609,3.563s-21.43-1.261-31.607-3.563c-63.684-14.438-111.378-71.444-111.378-139.423
		c0-67.988,47.694-124.995,111.378-139.424c10.178-2.311,20.742-3.563,31.607-3.563s21.431,1.252,31.609,3.563
		C1595.326,299.46,1643.029,356.467,1643.029,424.455z"/>
                                <path className='fill-black dark:fill-white' d="M331.574,1767.534V628.232c98.758-15.257,174.603-100.822,174.603-203.777s-75.845-188.529-174.603-203.777
		V32.467c0-17.454-14.146-31.608-31.608-31.608c-17.454,0-31.608,14.155-31.608,31.608v188.211
		C169.609,235.926,93.763,321.5,93.763,424.455s75.846,188.521,174.594,203.777v1139.302c0,17.453,14.155,31.608,31.608,31.608
		C317.428,1799.143,331.574,1784.987,331.574,1767.534z M156.98,424.455c0-67.988,47.703-124.995,111.377-139.424
		c10.178-2.311,20.752-3.563,31.608-3.563c10.865,0,21.431,1.252,31.608,3.563c63.684,14.429,111.387,71.436,111.387,139.424
		c0,67.979-47.703,124.986-111.387,139.423c-10.178,2.302-20.743,3.563-31.608,3.563c-10.856,0-21.431-1.261-31.608-3.563
		C204.683,549.441,156.98,492.434,156.98,424.455z"/>
                                <path className='fill-black dark:fill-white' d="M931.617,1767.534V1419.51c98.748-15.257,174.594-100.822,174.594-203.777s-75.846-188.529-174.594-203.777
		V32.467c0-17.454-14.154-31.608-31.608-31.608c-17.462,0-31.608,14.155-31.608,31.608v979.488
		c-98.757,15.248-174.603,100.822-174.603,203.777s75.846,188.521,174.603,203.777v348.024c0,17.453,14.146,31.608,31.608,31.608
		C917.463,1799.143,931.617,1784.987,931.617,1767.534z M757.015,1215.732c0-67.986,47.703-124.995,111.386-139.424
		c10.177-2.309,20.743-3.563,31.608-3.563c10.865,0,21.431,1.254,31.608,3.563c63.676,14.429,111.378,71.438,111.378,139.424
		c0,67.979-47.702,124.986-111.378,139.424c-10.178,2.303-20.743,3.563-31.608,3.563c-10.865,0-21.431-1.26-31.608-3.563
		C804.717,1340.719,757.015,1283.711,757.015,1215.732z"/>
                              </g>
                            </svg>



                            System Settings
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                                }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg>
                          </NavLink>
                          {/* <!-- Dropdown Menu Start --> */}
                          <div
                            className={`translate transform overflow-hidden ${!open && 'hidden'
                              }`}
                          >
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              <li>

                                <NavLink
                                  to="/settings/company-bio"
                                  className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
${pathname.includes('company-bio') &&
                                    'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                    }`}
                                >

                                  Company Profile
                                </NavLink>
                              </li>




                              <li>
                                <NavLink
                                  to="/settings/features"
                                  className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('features') &&
                                    'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                    }`}
                                >

                                  Features
                                </NavLink>
                              </li>
                              <li>

                                <NavLink
                                  to="/settings/packages"
                                  className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('packages') &&
                                    'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                    }`}
                                >

                                  Packages
                                </NavLink>
                              </li>

                              <li>

                                <NavLink
                                  to="/settings/access"
                                  className={`group relative flex items-center gap-2.5 hover:text-[#a855f7]  py-2 px-4 rounded-md font-medium  dark:text-[#fafafa]  ease-in-out hover:bg-[#ffffff] dark:hover:bg-[#b76bff] 
                  ${pathname.includes('access') &&
                                    'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-[#fafafa] hover:text-[#fafafa] : dark:bg-gradient-to-r dark:from-fuchsia-600 dark:to-purple-600'
                                    }`}
                                >

                                  Access
                                </NavLink>
                              </li>


                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                </>


              )}





              <h3 className="mb-4 mt-4 ml-4 text-sm font-bold text-[#161616] dark:text-[#fafafa] ">
                User Role: {userRole}
              </h3>


            </ul>


          </div>








        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default AdminSidebar;
