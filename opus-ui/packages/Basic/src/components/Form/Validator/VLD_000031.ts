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

export const VLD_000031 = (claimEntities: any) => {
  const invoiceListMap = lodash.get(claimEntities, 'invoiceListMap', []);
  return existList(invoiceListMap, 'serviceItemList', 'Service item');
};

export const VLD_000031_1 = (invoiceListMap: any = []) => {
  return existList(invoiceListMap, 'serviceItemList', 'Service item');
};


export const VLD_000031_2 = (invoiceItem: any = []) => {
  return lodash.isEmpty(invoiceItem.serviceItemList) ? formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, 'Service item') : ''
};
