const path = require('path');
const { writeFile, rm, readFile } = require('fs/promises');
const { updateColorBizCollection } = require('../updateColorBizCollection');

const collectionFile = path.resolve(__dirname, './collectionFile.json');
beforeEach(async () => {
  await writeFile(collectionFile, JSON.stringify({
    change: {}
  }))
})
afterEach(async () => {
  await rm(collectionFile);
})
describe('upcateColorBizCollection', () => {
  test('update  create file', async () => {
    const change = [{
      from: 'a',
      to: 'b'
    }];
    await updateColorBizCollection({
      collectionFile,
      path: '/user/file.less',
      change,
    })
    await updateColorBizCollection({
      collectionFile,
      path: '/user/file.less',
      change: [{ from: 'c', to: 'd'}]
    })
    const fileContent = await readFile(collectionFile, 'utf8');
    expect(fileContent).toBe(JSON.stringify({"change":{"/user/file.less":[{"from":"a","to":"b"},{"from":"c","to":"d"}]}}))
  })
})
