import React from 'react';
import { assets, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const AllRoom = () => {
    const navigate = useNavigate();
  return (
    <div className='flex  flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div>
        <div>
            <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2'>Take advantage of our limited time offers and special package to enhance stay and create unforgettable memories.</p>
        </div>

        {roomsDummyData.map((room)=>(
            <div>
                <img onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                 src={room.images[0]} alt="hotel img" title='View room Details' className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'/>

                 <div>
                    <p className='text-gray-500'>{room.hotel.city}</p>
                    <p onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                     className='text-gray-800 text-3xl font-playfair cursor-pointer'>{room.hotel.name}</p>
                    <div className='flex items-center'>
                        <StarRating/>
                        <p className='ml-2'> 200+ Reviews</p>
                    </div>
                    <div className='flex item-center gap-1 text-gray-500 mt-2 text-sm'>
                        <img src={assets.locationIcon} alt="location" />
                        <span>{room.hotel.address}</span>
                    </div>
                 </div>
            </div>
            
        ))}

      </div>
      <div>
        {/* {filter} */}
      </div>
    </div>
  );
};

export default AllRoom;
