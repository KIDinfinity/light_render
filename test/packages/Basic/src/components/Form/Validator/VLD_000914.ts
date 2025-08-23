import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';
const isNotChange = (value) => (value === 0 ? false : !value);

export const VLD_000914 = (currency, limitData) => (rule: any, value: any, callback: Function) => {
  if (
    !isNotChange(value) &&
    (Number(value || 0) < Number(limitData?.limitAmount || 0) || !currency) &&
    !tenant.isPH()
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000924' }));
  }
  callback();
};
