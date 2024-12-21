document.getElementById('syncForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('videoFile', document.getElementById('videoFile').files[0]);
    formData.append('subtitleFile', document.getElementById('subtitleFile').files[0]);

    const output = document.getElementById('output');
    output.innerHTML = 'Processing...';

    try {
        const response = await fetch('/api/sync', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to synchronize subtitles');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'corrected_subtitles.srt';
        link.innerHTML = 'Download Corrected Subtitles';
        output.innerHTML = '';
        output.appendChild(link);
    } catch (err) {
        output.innerHTML = `Error: ${err.message}`;
    }
});
