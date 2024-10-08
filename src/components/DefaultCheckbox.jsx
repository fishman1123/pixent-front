// import React, { useState } from 'react';
// import './DefaultCheckbox.css'; // Styles file
//
// export const DefaultCheckbox = ({ options }) => {
//     const [selectedOption, setSelectedOption] = useState('');
//
//     const handleClick = (option) => {
//         setSelectedOption(option);
//     };
//
//     return (
//         <div className="selection-buttons-container">
//             {options.map((option) => (
//                 <button
//                     key={option}
//                     className={`selection-button ${selectedOption === option ? 'selected' : ''}`}
//                     onClick={() => handleClick(option)}
//                 >
//                     {option}
//                 </button>
//             ))}
//         </div>
//     );
// };
//
