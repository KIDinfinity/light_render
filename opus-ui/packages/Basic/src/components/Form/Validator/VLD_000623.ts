import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

// eslint-disable-next-line no-shadow
enum Decision {
  A = 'A',
  D = 'D',
  TBC = 'TBC',
}

export const VLD_000623 = (applyToPolicyBOList: any, isValidator: boolean) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    isValidator &&
    value === Decision.A &&
    !lodash.some(
      applyToPolicyBOList,
      (item: any) => formUtils.queryValue(item.policyDecision) === Decision.A
    )
  ) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000549' }));
    return;
  }

  callback();
};
