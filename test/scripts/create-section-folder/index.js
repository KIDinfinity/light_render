const path = require('path');
const { stat } = require('fs');

const createFolder = ({ sectionName, basePath }) => {
  const sectionPath = `${basePath}/${sectionName}/Section`
  stat(sectionPath, (err, stats) => {
    if (stats.isDirectory()) {

    }
  })
}

module.exports = { createFolder }
