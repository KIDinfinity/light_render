import moment from 'moment';
import { Print } from 'navigator/pages/ReportCenter/_utils/utils';
export default function* ({ payload }: any, { select }: any) {
  const { index, type, page } = payload;

  const execList = yield select((state: any) => state.sqlController?.execList);

  let { resultSet } = execList[index];

  if (type === 'current') {
    resultSet = resultSet.slice(page * 10 - 10, page * 10);
  }
  const headerInfo = Object.keys(resultSet[0])?.map((key: string) => ({
    columnTitle: key,
    entityField: key,
    render: 'string',
  }));

  const printUtils = new Print();
  const name =
    type === 'current'
      ? `${moment().format('YYYY年MM月DD日h时m分')} 第${page}页 Result ${index + 1}`
      : `${moment().format('YYYY年MM月DD日h时m分')} Result ${index + 1}`;
  printUtils.printExcelFn({
    worksheetName: name,
    headerInfo,
    bodyInfo: resultSet,
    fileName: name,
  });
}
