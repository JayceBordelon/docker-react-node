import multer from 'multer';

// Configure Multer to store files in memory
const upload = multer({
    storage: multer.memoryStorage(), // Store file as a buffer in memory
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;
