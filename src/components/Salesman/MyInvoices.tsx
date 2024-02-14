import { Link ,useNavigate} from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import * as Yup from "yup";
import InvoiceTable from '../Tables/InvoiceTable';


function MyInvoices() {


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
    <DefaultLayout>
    <Breadcrumb pageName="My Invoices" />

    <div className="w-full gap-9 sm:grid-cols-2 ">
      <div className="flex flex-col gap-9">
    
        
          
          
      <InvoiceTable 
tablehead={["","CustomerID", "Customer Name", "InvoiceID", "Invoice Date", "Action"]}
/>
          
        
      </div>

     
    </div>
  </DefaultLayout>
  )
}

export default MyInvoices
