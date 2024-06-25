const screenshot = require('desktop-screenshot')
const path = require('path');
const fs = require('fs');

const takePrint = {

  intervalId: 0,

  start: (inteval, count, printCount) => {

    takePrint.intervalId = setInterval(() => {
      console.log('Printou')
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
    }, inteval)
  },

  pause: () => {
    clearInterval(takePrint.intervalId)
  }

}

export { takePrint }