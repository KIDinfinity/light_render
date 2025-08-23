import { v4 as uuid } from 'uuid';
import moment from 'moment';
import getChunkList from './getChunkList';
import getFileExt from './getFileExt';
import getFileMD5 from './getFileMD5';


const getUploadList = async ({ dataSource, fileList, regions }: any) => {
  const uploadList = await Promise.all(fileList?.map(async (file: any) => {
    const { originFileObj, name } = file || {};
    const fileType = getFileExt(name);
    const fileMD5 = await getFileMD5(originFileObj);
    const chunkList = await getChunkList({ file, name, fileType, fileMD5, dataSource, regions })
    return {
      chunkList,
      category: fileType,
      creator: null,
      dataSource,
      deleted: null,
      execEndTime: null,
      execException: null,
      execStartTime: null,
      execStatus: null,
      gmtCreate: null,
      gmtModified: null,
      id: uuid(),
      modifier: null,
      name: file?.name,
      region: regions,
      transId: null,
      uploadSlice: 0,
      uploadTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      uploadTotal: chunkList?.[0]?.sliceCount,
      loading: true
    }
  }))
  return uploadList;
  // {
  //   "id": "21b89e9d4402416eb150bf108606babe",  // id 很重要，既是记录的 id，也是文件的 md5 校验码
  //   "name": "123.sql",  // 文件名
  //   "category": "SQL", // 文件类型
  //   "uploadSlice": "1", // 已上传的分片数量
  //   "uploadTotal": "10", // 总共要上传的分片数量
  //   "uploadTime": "2021-06-02T02:55:29.153Z", // 上传时间
  //   "execStartTime": "2021-06-02T02:55:29.153Z", // 文件执行开始时间
  //   "execEndTime": "2021-06-02T02:55:29.153Z", // 文件执行结束时间
  //   "execStatus": "SUCCESS", // 文件执行状态
  //   "execException": "", // 文件执行错误信息
  //   "regions": "HK,JP,TH", // 目标 regions
  //   "dataSource": "ds_venus-misc" // 目标数据库
  // }，
}

export default getUploadList;
