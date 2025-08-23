const { execSync } = require("child_process");
const lodash = require("lodash");

const addFiles = ({ files }) => {
  console.log("add files", files)
  lodash.forEach(files, (file) => {
    console.log('to add file', file);
    execSync(`git add ${file}`, (error) => {
      if (error) {
        console.log('add file error', error);
      }
    })
  })
};

module.exports = {
  addFiles
}
