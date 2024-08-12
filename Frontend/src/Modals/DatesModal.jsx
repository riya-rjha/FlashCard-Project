import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { RxCrossCircled } from "react-icons/rx";

const DatesModal = ({ onClose, Note }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full  bg-white h-fit rounded-xl p-4 flex flex-col relative'
      >
        <RxCrossCircled
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        {/* <h2 className='w-fit text-2xl text-purple-900 font-bold'>{Note.publishYear}</h2> */}
        <h4 className='mt-5 text-2xl font-bold underline'>{Note.topic}</h4>
        <div className="flex items-center gap-3 my-8">
          <CiCalendarDate className='text-red-500 text-3xl' />
          <h2>{new Date(Note.createdAt).toDateString()}</h2>
        </div>
        <p>Created at:
          <span className="mt-4">
            {new Date(Note.createdAt).getFullYear()}-{new Date(Note.createdAt).getMonth() + 1}-{new Date(Note.createdAt).getDate()} {new Date(Note.createdAt).toTimeString().split(' ')[0]}
          </span>
        </p>
        <p>Updated at :
          <span className="mt-4">
            {new Date(Note.updatedAt).getFullYear()}-{new Date(Note.updatedAt).getMonth() + 1}-{new Date(Note.updatedAt).getDate()}  {new Date(Note.updatedAt).toTimeString().split(' ')[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DatesModal;