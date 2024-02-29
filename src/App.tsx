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
import CustomerRegisterAdmin from './components/Admin/FormLayout/CustomerRegisterAdmin';
import CustomerInsightAdmin from './components/Admin/TableLayout/CustomerInsightAdmin';
import AdminInvoicesPD from './components/Admin/TableLayout/InvoicesAdminPD';
import AdminInvoicesAccept from './components/Admin/TableLayout/InvoicesAdminAccept';
import SalesAgentAdmin from './components/Admin/CompanyRoles/TableLayout/SalesAgentAdminSA';
import SaTableAdminSATemp from './components/Admin/CompanyRoles/TableTemplate/SaTableAdminSATemp';



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

        {userRole === "superadmin" && (


          <>

            <Route
              path="/adminDashboard"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard" />
                  <AdminDashboard userRole={userRole}/>
                </>
              }
            />


            <Route
              path="/customers/customer-registration"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Registration" />
                  <CustomerRegisterAdmin userRole={userRole}/>
                </>
              }
            />


<Route
              path="/customers/customer-insight"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <CustomerInsightAdmin userRole={userRole}/>
                </>
              }
            />


<Route
              path="/invoices/pd-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesPD userRole={userRole}/>
                </>
              }
            />


<Route
              path="/invoices/accepted-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesAccept userRole={userRole}/>
                </>
              }
            />


<Route
              path="/auth/sales-agents"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SalesAgentAdmin userRole={userRole}/>
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
        <AdminDashboard userRole={userRole}/>
      </>
    }
  />


  <Route
    path="/customers/customer-registration"
    element={
      <>
        <PageTitle title="VoiceD | Admin Dashboard - Customer Registration" />
        <CustomerRegisterAdmin userRole={userRole}/>
      </>
    }
  />


<Route
    path="/customers/customer-insight"
    element={
      <>
        <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
        <CustomerInsightAdmin userRole={userRole}/>
      </>
    }
  />


<Route
    path="/invoices/pd-invoices"
    element={
      <>
        <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
        <AdminInvoicesPD userRole={userRole}/>
      </>
    }
  />


<Route
    path="/invoices/accepted-invoices"
    element={
      <>
        <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
        <AdminInvoicesAccept userRole={userRole}/>
      </>
    }
  />



<Route
              path="/auth/sales-agents"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SalesAgentAdmin userRole={userRole}/>
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
                  <SalesDashboard userRole={userRole}/>
                </>
              }
            />
            <Route
              path="/customerReg"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <CustomerRegister userRole={userRole}/>
                </>
              }
            />

            <Route
              path="/customerInsight"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <CustomerInsight userRole={userRole}/>
                </>
              }
            />



            <Route
              path="/myInvoices"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <MyInvoices userRole={userRole}/>
                </>
              }
            />


            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <Profile userRole={userRole}/>
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
