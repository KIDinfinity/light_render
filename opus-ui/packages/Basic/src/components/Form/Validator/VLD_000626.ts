import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

// eslint-disable-next-line no-shadow
enum Decision {
  A = 'A',
  D = 'D',
  TBC = 'TBC',
}

export const VLD_000626 = (applyToPolicyBOList: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    lodash.size(applyToPolicyBOList) > 1 &&
    value === Decision.D &&
    lodash.some(
      applyToPolicyBOList,
      (item: any) => formUtils.queryValue(item.policyDecision) !== Decision.D
    )
  ) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000551' }));
    return;
  }

  callback();
};
