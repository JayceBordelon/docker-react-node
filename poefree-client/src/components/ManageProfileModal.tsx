import React, { useState } from 'react';
import { useAuthValidation } from '../hooks/hooks';
import { uploadUserProfileImage } from '../api/imageService';
import { UserSession } from '../session/sessionHandler';

interface ProfileModalProps {
    setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ManageProfileModal({
    setEditingProfile,
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
            console.info('Attempting to upload image');
            const response = await uploadUserProfileImage(formData); // POST request
            console.info('Response:', response);
            setSuccessMessage('Profile image updated successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Failed to upload image.');
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
            </div>
        </div>
    );
}
