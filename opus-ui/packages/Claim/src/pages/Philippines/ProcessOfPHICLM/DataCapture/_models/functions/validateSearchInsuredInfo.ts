import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const searchInsuredValidateKeyArr: string[] = ['firstName', 'surname'];
export function validateSearchInsuredInfo(key: string, value: string) {
  const errors = [];
  if (lodash.includes(searchInsuredValidateKeyArr, key) && (!value || value === '')) {
    errors.push({
      field: key,
      message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
    });
  }
  return errors.length > 0 ? errors : undefined;
}
export default validateSearchInsuredInfo;
