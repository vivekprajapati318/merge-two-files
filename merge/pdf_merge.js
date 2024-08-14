const express = require('express');
const mergepdfs = require('./mergepdfs'); // Assuming mergepdfs.js is in the same directory
const path = require('path');
const multer = require('multer');

const app = express();
const port = 8000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/pdf_merge', upload.array('pdfs', 2), async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).send('Please upload two PDF files.');
        }

        const p1 = path.join(__dirname, req.files[0].path);
        const p2 = path.join(__dirname, req.files[1].path);

        await mergepdfs(p1, p2);

        res.sendFile(path.join(__dirname, 'merged.pdf'));
    } catch (error) {
        console.error('Error merging PDFs:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
