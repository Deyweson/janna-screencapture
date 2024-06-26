const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')
const cancelBtn = document.querySelector('#cancel')
const videoExportBtn = document.querySelector('#video-export')

const printCount = document.querySelector('#print-count')
const printInterval = document.querySelector('#interval-input')

import { takePrint } from "./takePrint.js"
import { makeVideo } from "./makeVideo.js"

let count = 0

document.querySelector('#interval-input').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^\d.]/g, '');
})

playBtn.addEventListener('click', () => {
    pauseBtn.disabled = false
    playBtn.disabled = true
    const interval = Number(printInterval.value) * 1000
    takePrint.start(interval, count, printCount)
})
pauseBtn.addEventListener('click', () => {
    pauseBtn.disabled = true
    playBtn.disabled = false
    takePrint.pause()
})
cancelBtn.addEventListener('click', () => {
    is_printing = false
    count = 0
})
videoExportBtn.addEventListener('click', () => {
    console.log('...')
    makeVideo.execute()
})