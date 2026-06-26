import React from 'react';

const DashBoardHeading = ({title,description}) => {
  return (
     <div className='border-b botder-white/5 pb-5'>
      <h2 className='text-3xl font-extrabold text-white'>{title }</h2>
      <p>{description }</p>
        </div>
  );
};

export default DashBoardHeading;