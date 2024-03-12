import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import SalesDashboard from './pages/Dashboard/SalesDashboard';
import Profile from './pages/Profile';
import CustomerRegister from './components/Salesman/FormLayout/CustomerRegister';
import CustomerInsight from './components/Salesman/TableLayout/CustomerInsight';
import MyInvoices from './components/Salesman/TableLayout/MyInvoices';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import FinanceDashboard from './pages/Dashboard/FinanceDashboard';
import CustomerRegisterAdmin from './components/Admin/FormLayout/CustomerRegisterAdmin';
import CustomerInsightAdmin from './components/Admin/TableLayout/CustomerInsightAdmin';
import AdminInvoicesPD from './components/Admin/TableLayout/InvoicesAdminPD';
import AdminInvoicesAccept from './components/Admin/TableLayout/InvoicesAdminAccept';
import SalesAgentAdmin from './components/Admin/CompanyRoles/TableLayout/UserTableAdmin';
import SaTableAdminSATemp from './components/Admin/CompanyRoles/TableTemplate/UserTableAdminTemp';
import CustomerSelfPortal from './components/Customer/CustomerSelfPortal';
import CreateInvoice from './components/Admin/FormLayout/CreateInvoice';
import CreateSupplierInvoice from './components/Admin/FormLayout/CreateSupplierInvoice';
import CreateInvoiceAgent from './components/Salesman/FormLayout/CreateInvoice';
import SocialPackages from './components/Admin/Layouts/SocialPackages';
import SocialPackagesEDT from './components/Admin/EditingComponents/SocialPackagesEDT';



function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const { pathname } = useLocation();


  // const [userRole, setUserRole] = useState<string | null>(null);



  const [userRole, setUserRole] = useState<string | null>(() => {
    // Initialize userRole from localStorage if available, otherwise, default to null
    return localStorage.getItem('userRole') || null;
  });



  const handleLogin = (role: string) => {
    // Set userRole in state
    setUserRole(role);
    // Save userRole to localStorage for persistence across page refreshes
    localStorage.setItem('userRole', role);
  };

  useEffect(() => {
    // Simulate loading/authentication delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="VoiceD | Sales Agent - Dashboard" />
              <SignIn onLogin={handleLogin} />
            </>
          }
        />


        <Route
          path='/customer-self-Reg'
          element={
            <>
              <PageTitle title="VoiceD | Customer Registration Portal" />
              <CustomerSelfPortal />
            </>
          }
        />








        {userRole === "superadmin" && (


          <>

            <Route
              path="/adminDashboard"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard" />
                  <AdminDashboard userRole={userRole} />
                </>
              }
            />


            <Route
              path="/customers/customer-registration"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Registration" />
                  <CustomerRegisterAdmin userRole={userRole} />
                </>
              }
            />


            <Route
              path="/customers/customer-insight"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <CustomerInsightAdmin userRole={userRole} />
                </>
              }
            />


            <Route
              path="/invoices/pd-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesPD userRole={userRole} />
                </>
              }
            />

            <Route
              path="/invoices/ad-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Create Invoice" />
                  <CreateInvoice userRole={userRole} />
                </>
              }
            />


            <Route
              path="/supplierin/adsup-in"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Create Supplier Invoice" />
                  <CreateSupplierInvoice userRole={userRole} />
                </>
              }
            />




            <Route
              path="/purchase/mn-vendors"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Create Invoice" />
                  <CreateInvoice userRole={userRole} />
                </>
              }
            />




            <Route
              path="/invoices/accepted-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesAccept userRole={userRole} />
                </>
              }
            />


            <Route
              path="/auth/sales-agents"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SalesAgentAdmin userRole={userRole} />
                </>
              }
            />



            <Route
              path="/vdservices/sm-ser"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SocialPackages userRole={userRole} />
                </>
              }
            />


            <Route
              path="/settings/packages"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SocialPackagesEDT userRole={userRole} />
                </>
              }
            />





          </>

        )}



        {userRole === "admin" && (


          <>



            <Route
              path="/adminDashboard"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard" />
                  <AdminDashboard userRole={userRole} />
                </>
              }
            />


            <Route
              path="/customers/customer-registration"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Registration" />
                  <CustomerRegisterAdmin userRole={userRole} />
                </>
              }
            />


            <Route
              path="/customers/customer-insight"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <CustomerInsightAdmin userRole={userRole} />
                </>
              }
            />


<Route
              path="/invoices/pd-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesPD userRole={userRole} />
                </>
              }
            />

            <Route
              path="/invoices/ad-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Create Invoice" />
                  <CreateInvoice userRole={userRole} />
                </>
              }
            />


            <Route
              path="/supplierin/adsup-in"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Create Supplier Invoice" />
                  <CreateSupplierInvoice userRole={userRole} />
                </>
              }
            />




            <Route
              path="/purchase/mn-vendors"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Create Invoice" />
                  <CreateInvoice userRole={userRole} />
                </>
              }
            />




            <Route
              path="/invoices/accepted-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesAccept userRole={userRole} />
                </>
              }
            />


            <Route
              path="/auth/sales-agents"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SalesAgentAdmin userRole={userRole} />
                </>
              }
            />



            <Route
              path="/vdservices/sm-ser"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SocialPackages userRole={userRole} />
                </>
              }
            />




          </>

        )}


        {userRole === "finance" && (


          <>



            <Route
              path="/financeDashboard"
              element={
                <>
                  <PageTitle title="VoiceD | Finance Dashboard" />
                  <FinanceDashboard userRole={userRole} />
                </>
              }
            />


            <Route
              path="/customers/customer-registration"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Registration" />
                  <CustomerRegisterAdmin userRole={userRole} />
                </>
              }
            />


            <Route
              path="/customers/customer-insight"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <CustomerInsightAdmin userRole={userRole} />
                </>
              }
            />


            <Route
              path="/invoices/pd-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesPD userRole={userRole} />
                </>
              }
            />


            <Route
              path="/invoices/accepted-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesAccept userRole={userRole} />
                </>
              }
            />



            <Route
              path="/auth/sales-agents"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SalesAgentAdmin userRole={userRole} />
                </>
              }
            />




          </>

        )}




        {userRole === "sales" && (

          <>

            <Route
              path="/dashboard"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <SalesDashboard userRole={userRole} />
                </>
              }
            />
            <Route
              path="/customers/customer-registration"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Customer Registration" />
                  <CustomerRegister userRole={userRole} />
                </>
              }
            />

            <Route
              path="/customers/customer-insight"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Customer Insight" />
                  <CustomerInsight userRole={userRole} />
                </>
              }
            />



            <Route
              path="/invoices/ad-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Create Invoices" />
                  <CreateInvoiceAgent userRole={userRole} />
                </>
              }
            />


            <Route
              path="/invoices/pd-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Pendinig Invoices" />
                  <MyInvoices userRole={userRole} />
                </>
              }
            />



            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <Profile userRole={userRole} />
                </>
              }
            />



          </>

        )}


      </Routes>
    </>
  );
}

export default App;
