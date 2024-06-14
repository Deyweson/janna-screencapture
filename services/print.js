var screenshot = require('desktop-screenshot')
const fs = require('fs');
const path = require('path');

let is_printing = false
let count = 0

function takePrint() {
    if (is_printing) {
        count++

        const filePath = path.join(__dirname, 'imgs', `screenshot${count}.jpg`);

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
    count = 0
}
function startPrint() {
    is_printing = true
}


setInterval(takePrint, 5000)

const startBtn = document.querySelector('#startbtn')
const stopBtn = document.querySelector('#stopbtn')
startBtn.addEventListener('click', () => {
    startPrint()
})
stopBtn.addEventListener('click', () => {
    stopPrint()
})