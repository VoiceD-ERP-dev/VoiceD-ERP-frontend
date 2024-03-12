import { Link ,useNavigate} from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../../layout/DefaultLayout';
import * as Yup from "yup";
import CustomerTableSales from '../TableTemplate/CustomerTableSales';


function CustomerInsight({userRole} : {userRole :  string}) {


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
    <DefaultLayout userRole={userRole}>
    <Breadcrumb pageName="Customer Insight" />

    <div className="w-full gap-9 sm:grid-cols-2 ">
      <div className="flex flex-col gap-9">
    
        
          
          
<CustomerTableSales 
tablehead={["CustomerID", "Customer Name", "Registered On"]}
/>
          
        
      </div>

     
    </div>
  </DefaultLayout>
  )
}

export default CustomerInsight
