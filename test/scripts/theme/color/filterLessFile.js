const filterLessFile = (file) => {
  return /\.less$/.test(file);
}

module.exports = { filterLessFile }
