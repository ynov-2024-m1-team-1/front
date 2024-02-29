import React from 'react';

const TextArea = ({ value, onChange, className }) => {
  return (
    <textarea 
        value={value} 
        onChange={onChange} 
        className={className || "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"}

    />
  );
};

export default TextArea;
