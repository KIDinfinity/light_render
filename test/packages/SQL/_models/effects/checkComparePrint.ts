import moment from 'moment';
import { Print } from 'navigator/pages/ReportCenter/_utils/utils';

export default function* ({ payload }: any, {}: any) {
  const { data, tableName, dbName, type } = payload || {};

  if (type) {
    const printUtils = new Print();
    const name = `${moment().format('YYYY年MM月DD日h时m分')}`;
    printUtils.printExcelFnSheet({
      data,
      fileName: name,
    });
  } else {
    const headerInfo = Object.keys(data[0] || {})?.map((key: string) => ({
      columnTitle: key,
      entityField: key,
      render: 'string',
    }));
    const printUtils = new Print();
    const name = tableName
      ? `${moment().format('YYYY年MM月DD日h时m分')} tableName:${tableName} dbName:${dbName}`
      : `${moment().format('YYYY年MM月DD日h时m分')} ALl`;
    printUtils.printExcelFn({
      worksheetName: name,
      headerInfo,
      bodyInfo: data,
      fileName: name,
    });
  }
}
