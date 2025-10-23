import SparkMD5 from 'spark-md5';
import getFileResult from './getFileResult';

const getFileMD5 = async (file: any) => {
  const fileResult: any = await getFileResult(file)
  const spark = new SparkMD5.ArrayBuffer()
  spark.append(fileResult);
  const fileMD5 = spark.end();
  return fileMD5;
}

export default getFileMD5;
