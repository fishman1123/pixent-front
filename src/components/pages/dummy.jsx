// // src/components/pages/ReportSummary.jsx
// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Carousel } from 'flowbite-react';
// import Test from '../summary/Test';
// import TestTwo from '../summary/TestTwo';
//
// export const ReportSummary = () => {
//     const location = useLocation();
//     const passedData = location.state;
//
//     useEffect(() => {
//         console.log('ReportSummary received data:', passedData);
//     }, [passedData]);
//
//     return (
//         <div className="max-w-2xl mx-auto mt-8">
//             <Carousel
//                 className="rounded-xl shadow-md h-[700px]"
//                 slideInterval={3000}  // optional auto-slide
//                 theme={{
//                     root: {
//                         base: 'relative h-full w-full',
//                     },
//                     control: {
//                         icon: 'w-5 h-5 text-black dark:text-black rtl:rotate-180',
//                         base: `inline-flex items-center justify-center w-10 h-10 rounded-full group-focus:outline-none`,
//                     },
//                 }}
//             >
//                 {/* Slide 1 */}
//                 <Test />
//                 {/* Slide 2 */}
//                 <TestTwo />
//             </Carousel>
//         </div>
//     );
// };
