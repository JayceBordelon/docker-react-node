import React, { useState } from 'react';
import { uploadUserProfileImage } from '../api/imageService';
import { ENDPOINTS } from '../constants/contants';
import Loading from './Loading';
import { handleSessionLogout, updateUserSession } from '../util/sessionHandler';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

interface ProfileModalProps {
    setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
    setProfileImageUri: React.Dispatch<React.SetStateAction<string>>;
}

export default function ManageProfileModal({
    setEditingProfile,
    setProfileImageUri,
}: ProfileModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            if (!selectedFile.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                // 5 MB limit
                setError('File size should not exceed 5MB.');
                return;
            }
            setFile(selectedFile);
            setError(null);
            setSuccessMessage(null);
        }
    };

    const sendFileToServer = async () => {
        if (!file) {
            setError('Please select a file to upload!');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const res = await uploadUserProfileImage(formData);
            if (res.data.profileImage) {
                setProfileImageUri(
                    `${import.meta.env.VITE_API_URL}${ENDPOINTS.imageBase}/profile/${res.data.profileImage}?t=${Date.now()}`,
                );
            }
            updateUserSession(res.data);
            setSuccessMessage('Profile image updated successfully!');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="modal-backdrop"
            onClick={() => setEditingProfile(false)}
        >
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                <IoClose
                    title="close modal"
                    className="close-modal-x"
                    size={35}
                    onClick={() => setEditingProfile(false)}
                />
                <h2>Edit Profile</h2>
                <div className="seperator"></div>
                <h3>Change/Set Profile Image</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {file && (
                    <button onClick={sendFileToServer} disabled={loading}>
                        {loading ? 'Uploading ...' : `Upload ${file.name}`}
                    </button>
                )}
                {error && <p className="error-message">{error}</p>}
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}
                {loading && <Loading size={25} message="" />}
                <div className="seperator"></div>
                <button
                    type="button"
                    onClick={() => handleSessionLogout(navigate)}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}
