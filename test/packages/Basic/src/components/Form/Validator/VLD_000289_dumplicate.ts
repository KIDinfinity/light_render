import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * declaration校验
 * @param usTaxDeclarations
 */
export const VLD_000289 = (usTaxDeclarations: any) => (
  rule: any,
  value: boolean,
  callback: Function
) => {
  if (
    formUtils.queryValue(usTaxDeclarations?.checked) &&
    lodash.isEmpty(formUtils.queryValue(usTaxDeclarations?.cardNo)) &&
    lodash.isEmpty(formUtils.queryValue(usTaxDeclarations?.identificationNumber))
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000281' }, value));
  }
  callback();
};
