import React from 'react';

const Spinner = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <div className='relative'>
        <div className='w-12 h-12 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin'></div>
      </div>
    </div>
  );
};

export default Spinner;
