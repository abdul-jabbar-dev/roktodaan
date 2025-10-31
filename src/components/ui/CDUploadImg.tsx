'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UserState } from '@/redux/slice/userSlice';
import API from '@/api';
import CDSpinner from './CDSpinner';
import { toast } from 'react-toastify';

interface CDUploadImgSimpleProps {
    edit: boolean;
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
    size?: number; // optional custom size
    fallback?: string; // optional fallback image
}

const CDUploadImgSimple: React.FC<CDUploadImgSimpleProps> = ({
    edit,
    user,
    setUser,
    size = 300,
    fallback = 'https://avatar.iran.liara.run/public/',
}) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // create a local preview
        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('profile', file);

            // Call your backend API (which uploads to Cloudinary)
            const res = await API.user.upload_img(formData);

            if (!res?.imageUrl) throw new Error('Upload failed');

            toast.success('Profile uploaded successfully ✅');

            // Update local state with the uploaded image
            setUser(prev => ({
                ...prev,
                profile: { ...prev.profile, img: res.imageUrl },
            }));

            // clear preview
            setPreview(null);
        } catch (err: any) {
            console.error('Upload error:', err);
            toast.error(err?.response?.data?.error || err.message || 'Upload failed ❌');
            // reset preview if upload fails
            setPreview(null);
        } finally {
            setUploading(false);
            // reset input value so same file can be re-uploaded if needed
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleClick = () => {
        if (edit && inputRef.current) inputRef.current.click();
    };

    const displayImg = preview || user?.profile?.img || fallback;

    return (
        <div
            className="relative rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 cursor-pointer"
            style={{ width: size, height: size }}
            onClick={handleClick}
            title={edit ? 'Click to change image' : ''}
        >
            {uploading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                    <CDSpinner />
                </div>
            )}

            <Image
                src={displayImg}
                width={size}
                height={size}
                alt={user?.profile?.fullName || 'Profile Image'}
                className="object-cover w-full h-full"
            />

            {edit && (
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            )}
        </div>
    );
};

export default CDUploadImgSimple;
