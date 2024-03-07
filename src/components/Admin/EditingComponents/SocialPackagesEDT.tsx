import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import DefaultAdminLayout from '../../../layout/DefaultAdminLayout';
import Succeed from '../Modal/Succeed';
import { useState } from 'react';
import PackageCardsEdit from './PackageCardsEdit';
import PackEdit from '../Modal/PackageEdit';


type PackageCardsProps = {
  packageName:string,
  price:string,
  features:string[],
  notes:string[],
  colorfrom: string,
  colorTo: string,
  colorVia: string,
  isOpen: boolean;
};


function SocialPackagesEDT({ userRole }: { userRole: string }) {

  const [packDataItem, setPackDataItem] = useState<PackageCardsProps | null>(null);
  const [showSucceedModal, setShowSucceedModal] = useState(false);
  const [showPackEdit, setShowPackEdit] = useState(false);
  

  const handleCloseModal = () => {
    // Close the Succeed modal
    setShowSucceedModal(false);
  };

  const handleClosePackModel = () => {
    // Close the Succeed modal
    setShowPackEdit(false);
    setPackDataItem(null);
  };

  const handleCardClick = (packageData: PackageCardsProps) => {
    setPackDataItem(packageData);
    setShowPackEdit(true);
  };



  return (
    <DefaultAdminLayout userRole={userRole}>
      <Breadcrumb pageName="Social Media Packages" />

      <div className="w-full gap-9 sm:grid-cols-2 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Customer Regsitration Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">

            <div className="p-6.5">

              <h2 className='text-[#2d2d2d] font-semibold text-[16px] dark:text-[#fafafa] mb-2'>Epic Packages</h2>
              <div className='w-full flex flex-wrap justify-center'>



                <PackageCardsEdit
                  packageName='1 Year Package'
                  price='3000'
                  features={['Graphic Post Design 5', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#84cc16'
                  colorVia='#4ade80'
                  colorTo='#2dd4bf'
                  onClick={() => handleCardClick({
                    packageName: '1 Year Package',
                    price: '3000',
                    features: ['Graphic Post Design 5', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag'],
                    notes: ['Boosting Charges will be applicable'],
                    colorfrom: '#84cc16',
                    colorVia: '#4ade80',
                    colorTo: '#2dd4bf',
                  })}

                 
                />

                <PackageCardsEdit
                  packageName='1 Month Package'
                  price='7000'
                  features={['Graphic Post Design 10', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable','20% Service charge of Ad Amount']}
                  colorfrom='#a78bfa'
                  colorVia='#d8b4fe'
                  colorTo='#f0abfc'
                  onClick={() => handleCardClick({
                    packageName: '1 Month Package',
      price: '7000',
      features: ['Graphic Post Design 10', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag'],
      notes: ['Boosting Charges will be applicable', '20% Service charge of Ad Amount'],
      colorfrom: '#a78bfa',
      colorVia: '#d8b4fe',
      colorTo: '#f0abfc',
                  })}
                />

                <PackageCardsEdit
                  packageName='AD Campaign'
                  price='12000'
                  features={['Graphic Post Design 1', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable','20% Service charge of Ad Amount']}
                  colorfrom='#facc15'
                  colorVia='#fbbf24'
                  colorTo='#fb923c'
                  onClick={() => handleCardClick({
                    packageName: 'AD Campaign',
      price: '12000',
      features: ['Graphic Post Design 1', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag'],
      notes: ['Boosting Charges will be applicable', '20% Service charge of Ad Amount'],
      colorfrom: '#facc15',
      colorVia: '#fbbf24',
      colorTo: '#fb923c',
                  })}
                />






              </div>

              <h2 className='text-[#2d2d2d] font-semibold text-[16px] dark:text-[#fafafa] mb-2 mt-2'>Common Packages</h2>
              <div className='w-full flex flex-wrap justify-center'>



                <PackageCardsEdit
                  packageName='Basic'
                  price='3000'
                  features={['Graphic Post Design 5', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#9333ea'
                  colorVia='#6366f1'
                  colorTo='#d946ef'
                  onClick={() => handleCardClick({
                    packageName: 'Basic',
      price: '3000',
      features: ['Graphic Post Design 5', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag'],
      notes: ['Boosting Charges will be applicable'],
      colorfrom: '#9333ea',
      colorVia: '#6366f1',
      colorTo: '#d946ef',
                  })}
                />

                <PackageCardsEdit
                  packageName='Platinum'
                  price='7000'
                  features={['Graphic Post Design 10', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#f43f5e'
                  colorVia='#f87171'
                  colorTo='#ec4899'
                  onClick={() => handleCardClick({
                    packageName: 'Platinum',
      price: '7000',
      features: ['Graphic Post Design 10', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag'],
      notes: ['Boosting Charges will be applicable'],
      colorfrom: '#f43f5e',
      colorVia: '#f87171',
      colorTo: '#ec4899',
                  })}
                />

                <PackageCardsEdit
                  packageName='Premium'
                  price='12000'
                  features={['Graphic Post Design 15', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag']}
                  notes={['Boosting Charges will be applicable']}
                  colorfrom='#0ea5e9'
                  colorVia='#22d3ee'
                  colorTo='#34d399'
                  onClick={() => handleCardClick({
                    packageName: 'Premium',
      price: '12000',
      features: ['Graphic Post Design 15', 'Ad Campaign Setup 1', 'Find FB Groups and share Posts', 'Social Media Stories', 'Captions and Keywords', 'Hash Tag'],
      notes: ['Boosting Charges will be applicable'],
      colorfrom: '#0ea5e9',
      colorVia: '#22d3ee',
      colorTo: '#34d399',
                  })}
                />

              </div>


            </div>
          </div>
        </div>


        {packDataItem && (
        <PackEdit isOpen={showPackEdit} onClose={handleClosePackModel} packDataItem={packDataItem} />
      )}
        <Succeed isOpen={showSucceedModal} onClose={handleCloseModal} />
      </div>
    </DefaultAdminLayout>
  )
}

export default SocialPackagesEDT
