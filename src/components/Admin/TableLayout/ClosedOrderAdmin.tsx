import { Link ,useNavigate} from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../Forms/SelectGroup/SelectGroupOne';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import * as Yup from "yup";
import ClosedOrderTableAdmin from '../TableTemplate/ClosedOrderTableAdmin';


function ClosedOrderAdmin({userRole} : {userRole : string}) {




  return (
    <DefaultAdminLayout userRole={userRole}>
    <Breadcrumb pageName="Closed Order" />

    <div className="w-full gap-9 sm:grid-cols-2 ">
      <div className="flex flex-col gap-9">
    
        
          
          
<ClosedOrderTableAdmin
tablehead={
  [
    "Order ID", 
    "Invoice ID",
    "Package Type",
    "Order Status",
    "Action",
    
    ]
    }
/>
          
        
      </div>

     
    </div>
  </DefaultAdminLayout>
  )
}

export default ClosedOrderAdmin
