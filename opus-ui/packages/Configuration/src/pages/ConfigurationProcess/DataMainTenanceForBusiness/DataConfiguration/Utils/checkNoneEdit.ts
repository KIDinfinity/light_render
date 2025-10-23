import lodash from 'lodash';
import { convert } from 'flattenjs';
import { getValueData } from 'configuration/utils';

const transferData = (rows: any) => lodash.map(rows, (item: any) => getValueData(convert(item)));

export default ({ originRows, rows }: any) => {
  return lodash.isEqual(transferData(originRows), transferData(rows));
};
