import { Uploader, Message, Loader, useToaster } from 'rsuite';
import React, { useState } from 'react';
import URLS from '@/config';
import { UserState } from '@/redux/slice/userSlice';

function previewFile(file: File, callback: (value: string | ArrayBuffer | null) => void) {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

const CDUploadImg = (
    { edit, user, setUser, updatedImg, setUpdatedImg }:
        {
            edit: boolean;
            user: UserState;
            setUser: React.Dispatch<React.SetStateAction<UserState>>,
            updatedImg: { public_id: string, secure_url: string },
            setUpdatedImg: React.Dispatch<React.SetStateAction<{ public_id: string, secure_url: string }>>
        }) => {
    const toaster = useToaster();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState<string | null>(null);
    return (
        <div>
            {edit ? <Uploader

                fileListVisible={false}
                listType="picture"
                action={URLS.CLOUDINARY_URL}
                data={{
                    upload_preset: "roktodan"
                }}
                onUpload={(file) => {
                    setUploading(true);
                    previewFile(file?.blobFile, (value) => {
                        if (typeof value === "string") setFileInfo(value);
                    });
                }}
                onSuccess={async (response, file) => {
                    setUploading(false);
                    toaster.push(<Message type="success">Uploaded successfully</Message>);

                    // ✅ আগের image delete করা
                    if (updatedImg.public_id && updatedImg.public_id !== response.public_id) {
                        try {
                            const res = await fetch(URLS.MEDIA.DELETE_MEDIA(updatedImg.public_id), { method: "DELETE" });
                            console.log("Deleted last image:", updatedImg.public_id, await res.json());
                        } catch (err) {
                            console.error("Failed to delete last image", err);
                        }
                    }

                    // ✅ নতুন image state এ set করা
                    setUpdatedImg({
                        public_id: response.public_id as string,
                        secure_url: response.secure_url
                    });
                }}

                onError={() => {
                    setFileInfo(null);
                    setUploading(false);
                    toaster.push(<Message type="error">Upload failed</Message>);
                }}
            >
                <button style={{ width: "100%", height: "100%" }}>
                    {uploading && <Loader backdrop center />}
                    {fileInfo ? (
                        <img src={fileInfo} width="100%" height="100%" />
                    ) : (
                        <img
                            src={
                                user.profile.img ||
                                "https://res.cloudinary.com/dnkwv76h3/image/upload/v1757350374/roktodan/hvt5xegpafmeix4thrjp.png"
                            }
                            width="100%"
                            height="100%"
                        />
                    )}
                </button>
            </Uploader>
                : <span>

                    <img
                        src={
                            user.profile.img ||
                            "https://res.cloudinary.com/dnkwv76h3/image/upload/v1757350374/roktodan/hvt5xegpafmeix4thrjp.png"
                        }
                        width="100%"
                        height="100%"
                    />
                </span>}</div>
    );
};

export default CDUploadImg;
