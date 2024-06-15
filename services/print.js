var screenshot = require('desktop-screenshot')
const fs = require('fs');
const path = require('path');
let is_printing = false
let count = 0

const countSpan = document.querySelector('#count')
async function takePrint() {
    if (is_printing) {
        countSpan.textContent = count
        const filePath = path.join(__dirname, 'imgs', `screenshot${count}.jpg`);
        count++
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        screenshot(filePath, function (error, complete) {
            if (error) console.log("Screenshot failed", error);
            else console.log("Screenshot succeeded");
        });
    }
}
const stopPrint = () => {
    is_printing = false
}
function startPrint() {
    count = 0
    is_printing = true
}


setInterval(takePrint, 2000)

const startBtn = document.querySelector('#startbtn')
const stopBtn = document.querySelector('#stopbtn')
startBtn.addEventListener('click', () => {
    startPrint()
})
stopBtn.addEventListener('click', () => {
    stopPrint()
})






const filePath = path.join(__dirname, 'imgs', `screenshot${count}.jpg`);

const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

var videoshow = require('videoshow')




var videoOptions = {
    fps: 25,
    loop: 1, // seconds
    transition: false,
    transitionDuration: 0, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '720x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p'
}

function makeVideo(imagems) {
    videoshow(imagems, videoOptions)
        .save('video.mp4')
        .on('start', function (command) {
            console.log('ffmpeg process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
            console.error('ffmpeg stderr:', stderr)
        })
        .on('end', function (output) {
            console.error('Video created in:', output)
        })
}

const videoBtn = document.querySelector('#videobtn')
videoBtn.addEventListener('click', () => {
    var imagems = []
    console.log(count)
    for (let i = 0; i < count; i++) {
        let path = `./imgs/screenshot${i}.jpg`
        console.log(path)
        imagems.push(path)
    }

    makeVideo(imagems)
})