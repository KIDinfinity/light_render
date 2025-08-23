import some from 'lodash/some';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_000840 = (sectionIndex, claimProcessData, successFn) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    some(
      claimProcessData,
      (data, index) => formUtils.queryValue(data.policyNo) === value && sectionIndex !== index
    )
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000464' }, value));
    return;
  }
  successFn(value);
  callback();
};
