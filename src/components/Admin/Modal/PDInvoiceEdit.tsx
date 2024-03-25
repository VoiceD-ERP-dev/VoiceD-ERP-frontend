import React,{useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFieldFilled from '../../FormElements/InputFiledFilled';
import PrimaryButton from '../../FormElements/PrimaryButon';
import InputFileUpload from '../../FormElements/InputFileUpload';
import SelectField from '../../FormElements/SelectField';
import InputFieldInvoice from '../../FormElements/InputFiledInvoice';
import DecisionPop from './DecisionPop';
import InputField from '../../FormElements/InputFiled';
import InputDatePicker from '../../FormElements/InputDatePicker';
import Succeed from './Succeed';
import axios from 'axios';


interface InvoiceEditContentProps {
  pendingInvoiceDataItem: {
    paymentType: string;
    invoiceNo: string;
    reason: string;
    orderdescription: string;
    createdAt: string;
    customerName:string;
    agentNo: string;
    packagename: string;
    startdate:string;
    deldate:string;
    _id:string;
  };
  onClose: () => void;
  
}

const currentDate = new Date().toLocaleDateString();

const SignUpSchema = Yup.object().shape({
  paymentMethod: Yup.string(),
  reason: Yup.string(),
  orderdescription: Yup.string()

});




const InvoiceEditContent = ({ pendingInvoiceDataItem, onClose }: InvoiceEditContentProps) => {


  const [showSucceedModal, setShowSucceedModal] = useState(false);
  const [showDecisionPop, setShowDecisionPop] = React.useState<{ isOpen: boolean }>({ isOpen: false });

  const handleEdit = async (values:any): Promise<void> => {
    let desc = "";
    console.log('Registered', values);
    if(values.decision==="Reject" ||values.decision==="Decline"){
      desc = values.reason;
    }else{
      desc = values.orderdescription;
    }

    const url = `http://localhost:5001/api/invoices/${values._id}/updateStatus`;
    const changeddata = {
      status: values.decision,
      responsibleDep: values.resdep,
      managerInCharge: values.mincharge,
      startingDate: values.startdate,
      estDeliveryDate: values.deldate,
      packageName: values.packagename,
      description: desc
    };
    console.log('Customer data:', changeddata);
    console.log('Decision', values.decision)

    if(values.decision === 'Reject')
    {
      setShowDecisionPop({ isOpen : true});
    }

    try {
      const response = await axios.patch(url, changeddata, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setShowSucceedModal(true);

    
    // if (values.decision == "Reject") {
    //   setShowDecisionPop({ isOpen: true });
    // }
  };


  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };


  return (

    <div className='w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20 '>
      <div className='modal p-5 bg-white dark:bg-black rounded-lg md:w-[50%] lg:w-[50%] w-full max-h-150 border-[2px] border-[#b76bff] overflow-auto'>
        <div className='flex flex-row justify-end w-full'>
          <div
            className='close w-[22px] h-[22px] rounded-full bg-[#b76bff] text-[#ffffff] flex justify-center items-center cursor-pointer'

          >
            <FontAwesomeIcon

              onClick={() => {
                onClose();
              }}

              icon={faClose} />
          </div>
        </div>

        <h3 className='text-lg text-[#161616] font-semibold dark:text-[#ffffff]'>Invoice Payment Clearance</h3>

        <Formik
          initialValues={{
            _id:pendingInvoiceDataItem._id,
            reason: "",
            decision: "",
            orderdescription:"",
            createdAt:pendingInvoiceDataItem.createdAt,
            customerName:pendingInvoiceDataItem.customerName,
            agentNo:pendingInvoiceDataItem.agentNo,
            paymentType:pendingInvoiceDataItem.paymentType,
            packagename:pendingInvoiceDataItem.packagename,
            startdate: new Date(), // Initialize with the current date
            deldate: new Date(),

          }}
          validationSchema={SignUpSchema}
          onSubmit={handleEdit}

        >



          {({ errors, touched, handleChange, values }) => (

            <Form className=" w-full">






              <div className='w-full flex flex-col justify-between space-y-3'>
                <div className='flex flex-col mt-2 space-y-1'>
                 <table className='md:w-1/2 w-full'>
                  <tr>
                    <td className=''>
                    <span className='font-semibold uppercase md:text-[14px] text-[12px]'>Invoice ID :</span>
                    </td>
                    <td>
                    <span className=' md:text-[14px] text-[12px]'> VDDG{pendingInvoiceDataItem.invoiceNo}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className=''>
                    <span className='font-semibold uppercase md:text-[14px] text-[12px]'>Invoice Date :</span>
                    </td>
                    <td>
                    <span className=' md:text-[14px] text-[12px]'> {pendingInvoiceDataItem.createdAt}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className=''>
                    <span className='font-semibold uppercase md:text-[14px] text-[12px]'>Customer Name :</span>
                    </td>
                    <td>
                    <span className=' md:text-[14px] text-[12px]'> {pendingInvoiceDataItem.customerName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className=''>
                    <span className='font-semibold uppercase md:text-[14px] text-[12px]'>Agent Id :</span>
                    </td>
                    <td>
                    <span className=' md:text-[14px] text-[12px]'> {pendingInvoiceDataItem.agentNo}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className=''>
                    <span className='font-semibold uppercase md:text-[14px] text-[12px]'>Payment Method :</span>
                    </td>
                    <td>
                    <span className=' md:text-[14px] text-[12px]'> {pendingInvoiceDataItem.paymentType}</span>
                    </td>
                  </tr>

                  

                 </table>
                
                
                </div>
                

                <SelectField
                  label='Make Decision'
                  name="decision"
                  headingvalue="Make Decision"
                  icon="Person"
                  options={['Accept', 'Decline', 'Reject']}
                  boxcolor='transparent'
                  values={values}
                  handleChange={handleChange}
                />


                {values.decision === 'Accept' && (
                  <div className='des-making flex w-full flex-col  mt-5 border-t-[1px] border-[#565656] border-opacity-25'>

                    <span className="text-[#1a1a1a] text-[14px] uppercase font-semibold dark:text-white mt-5">
                      Order Configuration
                    </span>

                    <div className='w-full flex flex-col mt-3'>
                      <h3 className='md:text-[14px] text-[12px] text-[#161616] dark:text-[#fafafa]'>Package : {pendingInvoiceDataItem.packagename}</h3>
                      <h3 className='md:text-[14px] text-[12px] text-[#161616] dark:text-[#fafafa]'>Date : {currentDate}</h3>
                    </div>

                    <div className='w-full flex flex-row justify-between space-x-3'>
                      <SelectField
                        label='Responsible Department'
                        boxcolor='transparent'
                        headingvalue="Select an Option"
                        options={["Graphic Designing Team", "Sales Department"]}
                        name='resdep'
                        icon='Inventory'
                        handleChange={handleChange}
                        values={values}
                      />

                      <SelectField
                        label='Manager Incharge'
                        boxcolor='transparent'
                        headingvalue="Select an Option"
                        options={["Mr. Krishanth ", "Ms. Dilhani"]}
                        name='mincharge'
                        icon='Inventory'
                        handleChange={handleChange}
                        values={values}
                      />


                    </div>


                    <div className='w-full flex flex-row justify-between space-x-3'>
                      <InputDatePicker
                        type='date'
                        label='Starting Date'
                        boxcolor='transparent'
                        name='startdate'
                        icon='CalendarMonth'
                        handleChange={handleChange}
                        values={values}
                      />

                      

                      <InputDatePicker
                        type='date'
                        label='Estimate Delivery Date'
                        boxcolor='transparent'
                        name='deldate'
                        icon='CalendarMonth'
                        handleChange={handleChange}
                        values={values}
                      />



                    </div>



                    <div className='w-full flex flex-col justify-between space-y-3 mt-3'>
                    <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold dark:text-white">
                      Order Description</span>
                    <textarea
                      className='w-full p-2 outline-none resize-none rounded-md border-[1px] border-[#565656] border-opacity-25'
                      rows={5}
                      cols={4}
                      name="orderdescription"
                      value={values.orderdescription}
                      onChange={handleChange}
                      required
                    />


                    </div>





                  </div>
                )}




                {values.decision !== 'Accept' && (
                  <div className='des-making flex w-full flex-col space-y-2'>
                    <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold dark:text-white">
                      Reason
                    </span>

                    <textarea
                      className='p-2 outline-none resize-none rounded-md border-[1px] border-[#565656] border-opacity-25'
                      rows={5}
                      cols={4}
                      name="reason"
                      value={values.reason}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

              </div>





              <div className='w-full flex md:flex-row flex-col justify-between md:space-x-3'>

                <PrimaryButton
                  label='Submit'
                  type='submit'
                  colorfrom='#c026d3'
                  colorto='#a855f7'
                  textcolor='#f5f5f5'
                />
              </div>

              {showDecisionPop.isOpen && (
                <DecisionPop
                  onClose={() => setShowDecisionPop({ isOpen: false })}
                  isOpen={showDecisionPop.isOpen}
                  values={values}
                />
              )}


            </Form>

          )}




        </Formik>

        <Succeed 
        message='Order Created Successfully'
        isOpen={showSucceedModal} 
        onClose={handleCloseModal} 
        
        />

      </div>
    </div>
  );

};

function PDInvoiceEdit({ pendingInvoiceDataItem, onClose }: InvoiceEditContentProps) {



  return (
    <Popup open={true} modal nested closeOnDocumentClick={false} closeOnEscape={false}>
      {(close: () => void) => (
        <InvoiceEditContent pendingInvoiceDataItem={pendingInvoiceDataItem} onClose={() => { onClose(); close(); }} />
      )}
    </Popup>
  );
}

export default PDInvoiceEdit;
