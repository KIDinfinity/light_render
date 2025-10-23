import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

export const VLD_000269 = (valueIsID: boolean, digitsLength: number) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const regionCode = tenant.region();
  if (regionCode === Region.ID && valueIsID) {
    value = lodash.isNumber(value) ? lodash.toString(value) : value;
    if (!/^[0-9]*$/g.test(value)) {
      callback('Out of range!');
    }
    if (lodash.isNumber(digitsLength) && value && value.length !== digitsLength) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000250' }, digitsLength));
    }
  }
  callback();
};
