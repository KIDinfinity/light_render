const { exec } = require("child_process");
const lodash = require("lodash");

const format = async ({ files }) => {
  if (lodash.isEmpty(files)) {
    return false;
  }
  const missionList = lodash.map(files, (file) => {
    return new Promise((resolve, reject) => {
      exec(`prettier ${file} --write`, (error, stdout, stderr) => {
        if (error) {
          console.error('format file error', error);
          reject(error);
        }
        if (stdout) {
          console.log('ggg', stdout);
          resolve(stdout);
        }
      })
    })
  })
  await Promise.all(missionList);
}

module.exports = { format }
