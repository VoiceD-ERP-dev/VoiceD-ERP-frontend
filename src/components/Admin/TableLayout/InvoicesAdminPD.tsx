import { Link ,useNavigate} from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import * as Yup from "yup";


import InvoiceTableAdminPDTemp from '../TableTemplate/InvoiceTableAdminPDTemp';

function AdminInvoicesPD( { userRole} : { userRole : string}) {


    const navigate = useNavigate();

    const SignUpSchema = Yup.object().shape({
        userName: Yup.string().required("Required"),
        nic: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        contact: Yup.string().required("Required"),
        userID: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      });

      const handleRegister = () => {
        navigate("/");
      };


  return (
    <DefaultAdminLayout userRole={userRole}>
    <Breadcrumb pageName="My Invoices" />

    <div className="w-full gap-9 sm:grid-cols-2 ">
      <div className="flex flex-col gap-9">
    
        
          
          
      <InvoiceTableAdminPDTemp 
tablehead={["","CustomerID", "Customer Name", "InvoiceID", "Invoice Date","Payment Status", "Action"]}
/>
          
        
      </div>

     
    </div>
  </DefaultAdminLayout>
  )
}

export default AdminInvoicesPD;
