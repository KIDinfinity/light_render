const { formatDirFiles } = require('../helper/formatDirFiles');
const { readFile, writeFile } = require('fs/promises')
const { addFileImport } = require('./addFileImport')
const { replaceRequired } = require('./replaceRequired')
const { addHookUsing } = require('./addHookUsing')
const { removeRequiredImport } = require('./removeRequiredImport')

const batchEdit = ({ dictPath }) => {
  formatDirFiles({
    dictPath,
    fileFilter: (filepath) => /\.tsx$/.test(filepath) && /\/Fields\//.test(filepath),
    format: async (path) => {
      const fileContent = await readFile(path, 'utf8');

      const contentAfterFormat = await removeRequiredImport({
        path,
        content: replaceRequired({
          path,
          content: addHookUsing({
            content: addFileImport({
              content: fileContent
            }),
            path
          }),
        })
      })

      if (contentAfterFormat) {
        await writeFile(path, contentAfterFormat)
      }
    }
  })
}


const batchEditList2 = ({ dictPath }) => {
  formatDirFiles({
    dictPath,
    fileFilter: async (filepath) =>{

     const mathPath = /\.tsx$/.test(filepath) && /\/Fields\//.test(filepath)
     const fileContent = await readFile(filepath, 'utf8');
     const reg1 = /const\s+requiredConditions\s+=\s+Rule\(config\['field-props'\]\['required-condition'\],\s+form,\s+''\);/
     const reg2 = /const\s+requiredConditions\s+=\s+RuleByForm\(fieldProps\['required-condition'\],\s+form,\s+''\);/

     return mathPath && (reg1.test(fileContent) || reg2.test(fileContent))

    },
    format: async (path) => {
      const fileContent = await readFile(path, 'utf8');

      const contentAfterFormat = await removeRequiredImport({
        path,
        content: replaceRequired({
          path,
          content: addHookUsing({
            content: addFileImport({
              content: fileContent
            }),
            path
          }),
        })
      })

      if (contentAfterFormat) {
        await writeFile(path, contentAfterFormat)
      }
    }
  })
}


module.exports = { batchEdit, batchEditList2 }
