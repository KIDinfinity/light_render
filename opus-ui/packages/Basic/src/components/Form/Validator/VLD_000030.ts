import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const existList = (map: any, keyCode: any, message: string) => {
  const errors: string[] = [];
  lodash.forEach(map, (item) => {
    if (lodash.isEmpty(item[keyCode])) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, message));
    }
  });
  return errors;
};

export const VLD_000030 = (claimEntities: any) => {
  const treatmentListMap = lodash.get(claimEntities, 'treatmentListMap', []);
  return existList(treatmentListMap, 'invoiceList', 'Invoice item');
};
