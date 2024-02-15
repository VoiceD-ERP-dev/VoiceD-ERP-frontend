import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import SalesDashboard from './pages/Dashboard/SalesDashboard';
import Profile from './pages/Profile';
import CustomerRegister from './components/Salesman/CustomerRegister';
import CustomerInsight from './components/Salesman/CustomerInsight';
import MyInvoices from './components/Salesman/MyInvoices';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import CustomerRegisterAdmin from './components/Salesman/CustomerRegisterAdmin';
import CustomerInsightAdmin from './components/Admin/CustomerInsightAdmin';


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
              path="/invoices/all-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <CustomerInsightAdmin />
                </>
              }
            />


<Route
              path="/invoices/accepted-invoices"
              element={
                <>
                  <PageTitle title="VoiceD | Admin Dashboard - Customer Insight" />
                  <CustomerInsightAdmin />
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
