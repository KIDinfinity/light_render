const path = require('path');
const { opendir } = require('fs/promises');

const formatDirFiles = async ({ dictPath, format, fileFilter }) => {
  // open dir
  const dir = await opendir(dictPath);
  for await (const dirent of dir){
    if (dirent.isFile()) {
      const filePath = path.resolve(dictPath, dirent.name);
      const fileGrep  = await fileFilter(filePath);
      if (fileGrep) {
        await format(filePath)
      }
    }
    if (dirent.isDirectory()) {
      await formatDirFiles({
        dictPath: path.resolve(dictPath, dirent.name),
        format,
        fileFilter
      })
    }
  }
}

module.exports = { formatDirFiles }
