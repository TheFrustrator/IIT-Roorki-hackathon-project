const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle file uploads and synchronization
app.post('/api/sync', upload.fields([{ name: 'videoFile' }, { name: 'subtitleFile' }]), async (req, res) => {
    const videoPath = req.files.videoFile[0].path;
    const subtitlePath = req.files.subtitleFile[0].path;
    const correctedSubtitlePath = path.join(__dirname, 'uploads', 'corrected_subtitles.srt');

    try {
        // Command to run subtitle synchronization (replace with actual logic)
        const command = `python subtitle_sync.py --video ${videoPath} --subtitle ${subtitlePath} --output ${correctedSubtitlePath}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
                return res.status(500).send('Error processing subtitles');
            }

            // Send corrected subtitles as response
            res.download(correctedSubtitlePath, 'corrected_subtitles.srt', (err) => {
                if (err) console.error(err);

                // Clean up files
                fs.unlinkSync(videoPath);
                fs.unlinkSync(subtitlePath);
                fs.unlinkSync(correctedSubtitlePath);
            });
        });
    } catch (err) {
        res.status(500).send('Error processing request');
    }
});

// Serve frontend files
app.use(express.static('public'));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
