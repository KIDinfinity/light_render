import { FILE_TYPE } from '../enum';

const getFileExt = (name: string) => {
  const ext = name.match(/(?<=\.)([0-9a-zA-Z]+)$/ig)?.[0] || "";
  if (/sql/i.test(ext)) {
    return FILE_TYPE.SQL
  }
  if (/xml/i.test(ext)) {
    return FILE_TYPE.LIQUI
  }
  return '';
}

export default getFileExt;
