const { formatDirFiles } = require('../helper/formatDirFiles');
const { readFile, writeFile } = require('fs/promises')
const { removeRequiredImport } = require('./removeRequiredImport')
const path = require('path')

const removeEdit = ({ dictPath }) => {
  formatDirFiles({
    dictPath,
    fileFilter: (filepath) => /\.tsx$/.test(filepath) && /\/Fields\//.test(filepath),
    format: async (path) => {
      const fileContent = await readFile(path, 'utf8');

      const contentAfterFormat = await removeRequiredImport({
        path,
        content: fileContent
      })

      if (contentAfterFormat) {
        await writeFile(path, contentAfterFormat)
      }
    }
  })
}


(() => {
  removeEdit({
    dictPath: path.resolve(__dirname, '../../packages/Process/NB/ManualUnderwriting/Client/ClientDetail')
  })
})()
