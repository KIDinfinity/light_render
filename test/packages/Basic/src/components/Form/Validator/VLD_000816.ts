import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

// 判断是否超过四位小数
export const VLD_000816 = () => (rule: any, value: any, callback: Function) => {
  const reg = tenant.region({
    [Region.MY]: /(^0(.\d{1,5})?$)|(^[1-9]\d*(.\d{0,5})?$)/,
    notMatch: /(^0(.\d{1,4})?$)|(^[1-9]\d*(.\d{0,4})?$)/,
  });
  const meg = tenant.region({
    [Region.MY]: 'MSG_000902',
    notMatch: 'MSG_000815',
  });
  if (value && !reg.test(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: meg }));
  }
  callback();
};
