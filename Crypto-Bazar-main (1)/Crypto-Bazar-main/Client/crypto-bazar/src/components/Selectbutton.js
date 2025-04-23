import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {
    return (
      <span
        onClick={onClick}
        className={`border border-gold rounded px-5 py-2.5 font-montserrat cursor-pointer
          ${selected ? 'bg-yellow-500 text-black font-bold' : 'bg-transparent text-white'}
          hover:bg-gold hover:text-black transition-colors duration-300 w-1/5`}
      >
        {children}
      </span>
    );
  };

export default SelectButton
