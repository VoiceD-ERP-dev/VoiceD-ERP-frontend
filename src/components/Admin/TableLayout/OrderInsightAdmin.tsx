import { Link ,useNavigate} from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../Forms/SelectGroup/SelectGroupOne';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import * as Yup from "yup";
import OrderTableAdmin from '../TableTemplate/OrderTableAdmin';


function OrderInsightAdmin({userRole} : {userRole : string}) {




  return (
    <DefaultAdminLayout userRole={userRole}>
    <Breadcrumb pageName="Order Insight" />

    <div className="w-full gap-9 sm:grid-cols-2 ">
      <div className="flex flex-col gap-9">
    
        
          
          
<OrderTableAdmin
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

export default OrderInsightAdmin
