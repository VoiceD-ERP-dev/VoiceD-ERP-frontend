import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import CustomerRegister from './components/Salesman/CustomerRegister';
import CustomerInsight from './components/Salesman/CustomerInsight';
import MyInvoices from './components/Salesman/MyInvoices';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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
              <SignIn />
            </>
          }
        />

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
          path="/calendar"
          element={
            <>
              <PageTitle title="VoiceD | Sales Agent - Dashboard" />
              <Calendar />
            </>
          }
        />

        <Route
          path="/customerReg"
          element={
            <>
              <PageTitle title="Customer Registration | Sales Agent - Dashboard" />
              <CustomerRegister />
            </>
          }
        />


        <Route
          path="/customerInsight"
          element={
            <>
              <PageTitle title="Customer Insight | Sales Agent - Dashboard" />
              <CustomerInsight />
            </>
          }
        />

        <Route
          path="/myInvoices"
          element={
            <>
              <PageTitle title="My Invoices | Sales Agent - Dashboard" />
              <MyInvoices />
            </>
          }
        />


      </Routes>
    </>
  );
}

export default App;
