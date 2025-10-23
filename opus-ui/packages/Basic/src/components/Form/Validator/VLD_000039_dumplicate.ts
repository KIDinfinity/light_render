import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
/**
 *
 * @param policyList 契约情报 section must have at lease one policy
 */
export const VLD_000039 = (policyList = []) => {
  let error;
  if (lodash.isEmpty(policyList)) {
    error = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000101' });
  }

  return error;
};
