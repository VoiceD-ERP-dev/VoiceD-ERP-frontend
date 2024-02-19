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


  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
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

        {userRole === "admin" && (


          <>

            <Route
              path="/adminDashboard"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard" />
                  <AdminDashboard />
                </>
              }
            />


            <Route
              path="/customers/customer-registration"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Registration" />
                  <CustomerRegisterAdmin />
                </>
              }
            />


<Route
              path="/customers/customer-insight"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <CustomerInsightAdmin />
                </>
              }
            />


<Route
              path="/invoices/pd-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesPD />
                </>
              }
            />


<Route
              path="/invoices/accepted-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <AdminInvoicesAccept />
                </>
              }
            />


<Route
              path="/auth/sales-agents"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <SalesAgentAdmin />
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
                  <SalesDashboard />
                </>
              }
            />
            <Route
              path="/customerReg"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <CustomerRegister />
                </>
              }
            />

            <Route
              path="/customerInsight"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <CustomerInsight />
                </>
              }
            />



            <Route
              path="/myInvoices"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <MyInvoices />
                </>
              }
            />


            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                  <Profile />
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
