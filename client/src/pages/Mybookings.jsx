import React from 'react';
import Title from '../components/Title';

const Mybookings = () => {
  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        <Title title='My Bookings' subtitle='Easily manage your past, current , and upcoming hotel reservation in one place. plan your trip seamlessly' align='left' />

        <div className='max-w-6xl mt-8 text-gray-800'>
            <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                <div className='w-1/3'>Hotels</div>
                <div className='w-1/3'>Dates & Timings</div>
                <div className='w-1/3'>Payment</div>
            </div>
        </div>
    </div>
  );
};

export default Mybookings;
