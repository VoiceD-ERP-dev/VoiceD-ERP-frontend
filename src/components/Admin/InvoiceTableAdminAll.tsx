import { Link ,useNavigate} from 'react-router-dom';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../Forms/SelectGroup/SelectGroupOne';
import DefaultAdminLayout from '../../layout/DefaultAdminLayout';
import * as Yup from "yup";
import CustomerTableAdmin from './CustomerTableAdmin';


function InvoiceTableAdminAll() {




  return (
    <DefaultAdminLayout>
    <Breadcrumb pageName="Customer Insight" />

    <div className="w-full gap-9 sm:grid-cols-2 ">
      <div className="flex flex-col gap-9">
    
        
          
          
<CustomerTableAdmin
tablehead={
  [
    "Sales Agent",
    "Invoice ID",
    "Customer ID", 
    "Customer Full Name",
    "Invoice Date",
    
    ]
    }
/>
          
        
      </div>

     
    </div>
  </DefaultAdminLayout>
  )
}

export default InvoiceTableAdminAll
