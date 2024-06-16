const screenshot = require('desktop-screenshot')
const videoshow = require('videoshow')
const path = require('path');
const fs = require('fs');

const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')
const cancelBtn = document.querySelector('#cancel')
const videoExportBtn = document.querySelector('#video-export')

const printCount = document.querySelector('#print-count')
const printInterval = document.querySelector('#interval-input')


let is_printing = false
let count = 0

async function takePrint() {
    if (is_printing) {
        printCount.textContent = count

        const filePath = path.join(__dirname, 'imgs', `screenshot${count}.jpg`);
        const dir = path.dirname(filePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        screenshot(filePath, function (error, complete) {
            if (error) console.log("Screenshot failed", error);
            else console.log("Screenshot succeeded");
        });

        count++
    }
}



playBtn.addEventListener('click', () => {

    if (Number(printInterval.value) <= 0) {
        console.log('Interval invalid')
        return;
    }
    is_printing = true
    playBtn.disabled = true
    pauseBtn.disabled = false
})
pauseBtn.addEventListener('click', () => {
    is_printing = false
    pauseBtn.disabled = true
    playBtn.disabled = false
})
cancelBtn.addEventListener('click', () => {
    is_printing = false
    count = 0
    //TO-DO: Delete imgs
})

setInterval(takePrint, 5000)


function makeVideo(imagens) {

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


    videoshow(imagens, videoOptions)
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


videoExportBtn.addEventListener('click', () => {
    var imagens = []
    console.log(count)
    for (let i = 0; i < count; i++) {
        let path = `./imgs/screenshot${i}.jpg`
        console.log(path)
        imagens.push(path)
    }

    makeVideo(imagens)
})