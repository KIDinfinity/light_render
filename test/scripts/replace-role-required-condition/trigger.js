const { batchEdit, batchEditList2 } = require( './index'
)
const path = require('path');

(() => {

  // batchEdit({
  //   dictPath: path.resolve(__dirname, '../../packages/Process/NB/ManualUnderwriting/Client/ClientDetail')
  // })


  batchEditList2({
    dictPath: path.resolve(__dirname, '../../packages/Process/NB/ManualUnderwriting/Client/ClientDetail')
  })
})()
