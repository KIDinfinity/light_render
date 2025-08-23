import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimDecision } from 'claim/pages/utils/claim';

export const VLD_000283HK = (dataItem: any, level: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const dataMap = {
    claim: {
      amount: formUtils.queryValue(dataItem?.totalPayableAmount),
      message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000457' }),
    },
    incident: {
      amount: formUtils.queryValue(dataItem?.payableAmount),
      message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000266' }),
    },
  };
  if (!dataMap[level].amount && formUtils.queryValue(value) !== ClaimDecision.deny) {
    callback(dataMap[level].message);
  }
  callback();
};
