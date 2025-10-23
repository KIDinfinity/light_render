import lodash from 'lodash';
import tenant from '@/components/Tenant/tenantObj';
import {  Region } from '@/components/Tenant/constants';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import formUtils from 'basic/components/Form/formUtils';
import { VLD_000182 as VLD_000182_HK } from './VLD_000182_HK';

/**
 *
 * @param claimPayableListMap 事故理算列表
 */
const VLD_000182_Default = (
  validating: boolean,
  claimPayableListMap: any = {},
  keyName?: string
) => (rule: any, value: any, callback: Function) => {
  if (validating && value === 'D') {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isApprove = lodash.every(claimPayableListMap, (item) => getDecision(item) === value);
    if (!isApprove) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000180' }));
    }
  }
  callback();
};

export const VLD_000182 = tenant.region({
  [Region.HK]: VLD_000182_HK,
  notMatch: VLD_000182_Default,
});
