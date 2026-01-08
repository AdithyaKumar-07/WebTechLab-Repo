const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins} : ${secs < 10 ? '0' : ' '}${secs}`;
}

const audioPlayer = document.getElementById('audioPlayer');
const videoPlayer = document.getElementById('videoPlayer');
const currentAudioTimeSpan = document.getElementById('currentAudioTime');
const currentVideoTimeSpan = document.getElementById('currentVideoTime');

audioPlayer.addEventListener('timeupdate', function() {
    currentAudioTimeSpan.textContent = formatTime(this.currentTime);
});

videoPlayer.addEventListener('timeupdate', function() {
    currentVideoTimeSpan.textContent = formatTime(this.currentTime);
});