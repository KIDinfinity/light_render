import lodash from 'lodash';
import { tranferResult } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import getValueData from './getValueData';

const transferData = (rows: any, dataFieldList: any) =>
  lodash.map(rows, (item: any) => getValueData(tranferResult(dataFieldList, item, true)));

export default ({ originRows, rows, dataFieldList }: any) => {
  return lodash.isEqual(transferData(originRows, dataFieldList), transferData(rows, dataFieldList));
};
