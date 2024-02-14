import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import CustomerRegister from './components/Salesman/CustomerRegister';
import CustomerInsight from './components/Salesman/CustomerInsight';
import MyInvoices from './components/Salesman/MyInvoices';
import AdminDashboard from './pages/Dashboard/AdminDashboard';


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
          <Route
            path="/adminDashboard"
            element={
              <>
                <PageTitle title="VoiceD | Admin Dashboard" />
                <AdminDashboard />
              </>
            }
          />
        )}

        {userRole === "sales" && (

          <>
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="VoiceD | Sales Agent - Dashboard" />
                <ECommerce />
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
          </>
          
        )}

        {/* Add other routes as needed */}
      </Routes>
    </>
  );
}

export default App;
