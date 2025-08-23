const { formatDirFiles } = require('../helper/formatDirFiles');
const { readFile, writeFile } = require('fs/promises')
const { removeElementConfigImport } = require('./removeElementConfigImport');
const { removeElementConfigTagStart } = require('./removeElementConfigTagStart')
const { removeElementConfigTagEnd } = require('./removeElementConfigTagEnd');
const { addConfigForFormItem  } = require('./addConfigForFormItem')
const { addConfigProps } = require('./addConfigProps')
const { addLoadshImport } = require('./addLoadshImport');
const { addFieldForFormItem } = require('./addFieldForFormItem')
const { removeLocalConfigImport } = require('./removeLocalConfigImport')
const { addFieldProps } = require('./addFieldProps')
const { removeSectionProps } = require('./removeSectionProps')


const replace = async ({ dictPath }) => {
  formatDirFiles({
    dictPath,
    fileFilter: (filepath) => /\.tsx$/.test(filepath) && /\/Fields\//.test(filepath),
    format: async (path) => {
      const fileContent = await readFile(path, 'utf8');
      let contentAfterFormat =
      removeSectionProps({
        content: removeLocalConfigImport({
          content: addFieldForFormItem({
            content: addFieldProps({
              content: addConfigProps({
                content: addConfigForFormItem({
                  content: removeElementConfigTagEnd({
                    content: removeElementConfigTagStart({
                      content: removeElementConfigImport({
                        content: fileContent
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
      // let contentAfterFormat =
      // addFieldProps({
      //   content:  addFieldForFormItem({
      //     content: addLoadshImport({
      //       content: addConfigProps({
      //         content: addConfigForFormItem({
      //           content: removeElementConfigTagEnd({
      //             content: removeElementConfigTagStart({
      //               content: removeElementConfigImport({
      //                 content: fileContent
      //               })
      //             })
      //           })
      //         })
      //       })
      //     })
      //   })
      // })
      // let contentAfterFormat = addFieldForFormItem({
      //   content: fileContent
      // })
      if (contentAfterFormat) {
        await writeFile(path, contentAfterFormat)
      }

    }
  })
}

module.exports = { replace };
