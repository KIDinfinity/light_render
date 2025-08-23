import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps {
  fileName?: string;
}
export const checkPhone = ({ fileName }: IProps) => (rule: any, value: any, callback: Function) => {
  const valueArr = value.split('-');
  if (lodash.isEmpty(fileName) && valueArr.length > 1 && lodash.size(valueArr[0]) > 3) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000004' }, 'country code', 3));
    return;
  }
  if (!lodash.isEmpty(fileName)) {
    const index = value.indexOf('-');
    const newValue = index > 0 ? value.substring(index + 1, value.length) : value;

    if (lodash.size(newValue) > 26) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000004' }, fileName, 26));
      return;
    }
  }
  callback();
};
