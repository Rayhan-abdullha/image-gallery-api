const { uploadMiddleware: { multerUploadMiddleware} } = require('../middleware');
const { upload } = require('../middleware/upload-middleware');
const path = require('path')
const fs = require('fs')

const express = require('express')
const router = express.Router()

router.get('/', (_req, res) => {
    res.send('Server is running..')
})

router.post('/upload', upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
    { name: 'file3', maxCount: 1 },
    { name: 'file4', maxCount: 1 }
]), (req, res) => {
    if (req.files) {
      res.status(200).json({ message: 'Files uploaded successfully', files: req.files, status: 200 });  
    } else {
      res.status(400).json({ message: 'No files were uploaded' });
    }
});
  
// Serve static files from the "uploads" directory
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// GET route to fetch all image files from the uploads folder
router.get('/images', (req, res) => {
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    // Read the directory to get file names
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to scan uploads directory' });
        }

        // Filter only image files (you can add more image types if needed)
        const imageFiles = files.filter(file => {
            const fileExt = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(fileExt);
        });

        // If no image files are found
        if (imageFiles.length === 0) {
            return res.status(404).json({ message: 'No images found' });
        }

        // Send the list of image files
        const imagePaths = imageFiles.map(file => `/uploads/${file}`);
        res.status(200).json({ images: imagePaths });
    });
});

module.exports = router;