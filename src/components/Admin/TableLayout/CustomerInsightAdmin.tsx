import { Link ,useNavigate} from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../Forms/SelectGroup/SelectGroupOne';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import * as Yup from "yup";
import CustomerTableAdmin from '../TableTemplate/CustomerTableAdmin';


function CustomerInsightAdmin({userRole} : {userRole : string}) {




  return (
    <DefaultAdminLayout userRole={userRole}>
    <Breadcrumb pageName="Customer Insight" />

    <div className="w-full gap-9 sm:grid-cols-2 ">
      <div className="flex  flex-col gap-9">
    
        
          
          
<CustomerTableAdmin
tablehead={
  [
    "Registered Agent",
    "Customer ID", 
    "Customer First Name",
    "Customer Last Name",
    "NIC",
    "BR ID",
    "Contact No",
    "Email",
    "Address", 
    "Registered On",
    "Documentation",
    "Action",
    
  ]
}

/>
          
        
      </div>

     
    </div>
  </DefaultAdminLayout>
  )
}

export default CustomerInsightAdmin
