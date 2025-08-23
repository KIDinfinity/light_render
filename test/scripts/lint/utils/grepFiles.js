const { exec } = require("child_process");
const lodash = require("lodash");

const grepChangeFile = async (reg) =>  {
  return new Promise((resolve, reject) => {
    exec("git diff-index --name-only --cached --diff-filter=AMR HEAD", async (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          reject(error.message)
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject(stderr);
          return;
      }
      const fileList = lodash.split(stdout, '\n')
      .filter(item => !lodash.isEmpty(item))
      .filter(item => reg.test(item))
      ;
      resolve(fileList)
    })
  })
}
module.exports = {
  grepChangeFile
}
