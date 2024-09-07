// Gallery.js
import { useGetData } from '../../../content';
import { adminUrl } from '../../../BackendUrl';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const Gallery = () => {
    const { userId } = useParams()
    const [data] = useGetData(`${adminUrl}users/details/${userId}?query=gallery`);
    console.log(data)

    const [selectedImage, setSelectedImage] = useState<any>(null);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-[0.8rem] font-bold text-center my-8"> <span className='text-[0.95rem] text-gray-500'> {!data?.user?.business_account_type ? data?.user?.first_name + ' ' + data?.user?.last_name : data?.user?.business_name}</span> Gallery</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data && data?.medias?.map((image: any) => image?.
                    is_video ? (<></>) :
                    (
                        <ImageItem
                            key={image.unique_id}
                            src={image.media}
                            alt={image.alt}
                            onClick={() => setSelectedImage(image)}
                            onMouseOver={() => setSelectedImage(image)}
                        />
                    ))}
            </div>
            {selectedImage && (
                <Modal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
};

export default Gallery;



const ImageItem = ({ src, alt, onClick }: any) => {
    return (
        <div
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={onClick}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
            />
        </div>
    );
};



// Modal.js

const Modal = ({ image, onClose }: any) => {
    return (
        <div
            className="fixed inset-0 bg-black  bg-opacity-75 flex items-center justify-center z-[400]"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg  shadow-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button
                    className="absolute top-0 right-0 m-4 text-white text-xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <img src={image.media} alt={image.unique_id} className="w-full h-auto max-w-3xl" />
            </div>
        </div>
    );
};
