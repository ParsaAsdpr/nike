import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap mt-10 mx-auto max-w-7xl" dir='rtl'>
      {['ورود کاربر', 'آدرس انتقال', 'نحوه پرداخت', 'سفارش کالا'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 pb-4 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'border-green-400   text-green-500'
           : 'border-gray-400 text-gray-400'
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
