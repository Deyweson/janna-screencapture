const screenshot = require('desktop-screenshot')
const videoshow = require('videoshow')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path');
const fs = require('fs');

const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')
const cancelBtn = document.querySelector('#cancel')
const videoExportBtn = document.querySelector('#video-export')

const printCount = document.querySelector('#print-count')
const printInterval = document.querySelector('#interval-input')

const ffmpegPath = require('ffmpeg-static');


let is_printing = false
let count = 0

async function takePrint() {
    if (is_printing) {
        const filePath = path.join(__dirname, 'temp', 'imgs', `ss${count}.jpg`);
        const dir = path.dirname(filePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        screenshot(filePath, function (error, complete) {
            if (error) console.log("Screenshot failed", error);
            else console.log("Screenshot succeeded");
        });

        count++
        printCount.textContent = count
    }
}



playBtn.addEventListener('click', () => {
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

setInterval(takePrint, 100)






function makeVideo() {

    const imagesDir = path.resolve(__dirname, 'temp', 'imgs');
    const fileListPath = path.resolve(__dirname, 'temp', 'filelist.txt');

    const imageFiles = fs.readdirSync(imagesDir)
        .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) // filtrar apenas arquivos de imagem
        .map(file => ({
            name: file,
            path: path.join(imagesDir, file),
            num: parseInt(file.match(/\d+/)[0]) // extrair número do nome do arquivo
        }))
        .sort((a, b) => a.num - b.num)

    // Escrever a lista de caminhos no arquivo de texto

    const fileListContent = imageFiles.map(file => `file '${file.path}'`).join('\n');
    fs.writeFileSync(fileListPath, fileListContent);

    // Configurar fluent-ffmpeg para usar ffmpeg do PATH
    ffmpeg.setFfmpegPath(ffmpegPath);

    ffmpeg()
        .input(fileListPath)
        .inputOptions(['-f concat', '-safe 0'])
        .outputOptions(['-pix_fmt yuv420p'])
        .save('video.mp4')
        .on('start', function (command) {
            console.log('ffmpeg process started:', command);
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err);
            console.error('ffmpeg stderr:', stderr);
        })
        .on('end', function (output) {
            console.log('Video created in:', output);
        });



    // var videoOptions = {
    //     fps: 25,
    //     loop: 1, // seconds
    //     transition: false,
    //     transitionDuration: 0, // seconds
    //     videoBitrate: 1024,
    //     videoCodec: 'libx264',
    //     size: '720x?',
    //     audioBitrate: '128k',
    //     audioChannels: 2,
    //     format: 'mp4',
    //     pixelFormat: 'yuv420p'
    // }


    // videoshow(imagens, videoOptions)
    //     .save('./video.mp4')
    //     .on('start', function (command) {
    //         console.log('ffmpeg process started:', command)
    //     })
    //     .on('error', function (err, stdout, stderr) {
    //         console.error('Error:', err)
    //         console.error('ffmpeg stderr:', stderr)
    //     })
    //     .on('end', function (output) {
    //         console.error('Video created in:', output)
    //     })
}


videoExportBtn.addEventListener('click', () => {
    console.log('...')
    makeVideo()
    // var imagens = []
    // console.log(count)
    // for (let i = 0; i < count; i++) {
    //     let _path = path.join(__dirname, 'imgs', `screenshot${count}.jpg`)
    //     console.log(_path)
    //     imagens.push(_path)
    // }
    // makeVideo(imagens)
})