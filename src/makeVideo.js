const ffmpeg = require('fluent-ffmpeg')
const path = require('path');
const fs = require('fs');

const makeVideo = {
  videoOptions: [
    '-r 25', // fps
    '-vcodec libx264', // video codec
    '-b:v 1024k', // video bitrate
    '-vf scale=720:-1', // size
    '-b:a 128k', // audio bitrate
    '-ac 2', // audio channels
    '-pix_fmt yuv420p', // pixel format
    '-f mp4' // format
  ],
  imagesDir: path.resolve(__dirname, 'temp', 'imgs'),
  fileListPath: path.resolve(__dirname, 'temp', 'filelist.txt'),

  execute: () => {
    const imageFiles = fs.readdirSync(makeVideo.imagesDir)
      .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
      .map(file => ({
        name: file,
        path: path.join(makeVideo.imagesDir, file),
        num: parseInt(file.match(/\d+/)[0])
      }))
      .sort((a, b) => a.num - b.num)

    const fileListContent = imageFiles.map(file => `file '${file.path}'\nduration 0.5`).join('\n');
    fs.writeFileSync(makeVideo.fileListPath, fileListContent);

    fs.appendFileSync(makeVideo.fileListPath, '\nfile \'' + imageFiles[imageFiles.length - 1].path + '\'');
    fs.appendFileSync(makeVideo.fileListPath, '\nduration 1');


    ffmpeg()
      .input(makeVideo.fileListPath)
      .inputOptions(['-f concat', '-safe 0'])
      .outputOptions(makeVideo.videoOptions)
      .save('video.mp4')
      .on('start', function (command) {
        console.log('Process started');
      })
      .on('error', function (err, stdout, stderr) {
        console.error('Error:', err);
        console.error('ffmpeg stderr:', stderr);
      })
      .on('end', function (output) {
        console.log('Video created');
      });
  }
}

export { makeVideo }