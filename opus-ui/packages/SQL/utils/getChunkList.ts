import getFileMD5 from './getFileMD5';
import getChunkSize from './getChunkSize';

// @ts-ignore
const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice

const getChunkList = async ({ file, fileType, fileMD5, dataSource, regions }: any) => {
  let current = 0;
  let count = 1;
  const chunkList = [];
  const chunkSize = getChunkSize(file?.size);
  const chunks = Math.ceil(file?.size / chunkSize);

  while (current < file?.size) {
    const chunk = blobSlice.call(file.originFileObj, current, current + chunkSize);
    // eslint-disable-next-line no-await-in-loop
    const sliceChecksum = await getFileMD5(chunk);
    const slice = new File([chunk], file?.name)
    chunkList.push({
      size: chunk?.size,
      sliceNo: count,
      sliceCount: chunks,
      slice,
      regions,
      dataSource,
      fileType,
      fileChecksum: fileMD5,
      sliceChecksum
    });
    current += chunkSize
    count += 1
  }
  return chunkList;
}

export default getChunkList;


