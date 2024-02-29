import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/SalesDashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import CustomerRegister from './components/Salesman/FormLayout/CustomerRegister';
import CustomerInsight from './components/Salesman/TableLayout/CustomerInsight';
import MyInvoices from './components/Salesman/TableLayout/MyInvoices';


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


        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="VoiceD | Sales Agent - Dashboard" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="VoiceD | Sales Agent - Dashboard" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="VoiceD | Sales Agent - Dashboard" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="VoiceD | Sales Agent - Dashboard" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
