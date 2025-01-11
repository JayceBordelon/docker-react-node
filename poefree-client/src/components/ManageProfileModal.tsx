import React, { useState } from 'react';
import { useAuthValidation } from '../hooks/hooks';
import { uploadUserProfileImage } from '../api/imageService';
import { UserSession, handleLogout } from '../session/sessionHandler';
import { ENDPOINTS } from '../constants/contants';

interface ProfileModalProps {
    setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
    setProfileImageUri: React.Dispatch<React.SetStateAction<string>>;
}

export default function ManageProfileModal({
    setEditingProfile,
    setProfileImageUri,
}: ProfileModalProps) {
    const session: UserSession | null = useAuthValidation();
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
        formData.append('image', file); // Attach the file
        formData.append('id', session?.id as string); // Attach the user ID

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
            <div
                className="modal-body"
                onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
            >
                <h2>Edit Profile</h2>
                <div className="seperator"></div>
                <h3>Change/Set Profile Image</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={sendFileToServer} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}
                <div className="seperator"></div>
                <button type="button" onClick={() => handleLogout()}>
                    Log Out
                </button>
            </div>
        </div>
    );
}
