import lodash from 'lodash';
import {
  checkClaimPayableDuplicate,
  getMappingPolicyByProduct,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/_models/functions/claimPayableFunc';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * 校验claimpayable的productCode值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000011ProductCode = (
  claimPayableListMap: any,
  incidentPayable: any,
  listPolicy: any[]
) => (rule: any, value: any, callback: Function) => {
  const payableTem = { ...incidentPayable, productCode: value };
  const mappedPolicy = getMappingPolicyByProduct(listPolicy, payableTem);
  if (lodash.isPlainObject(mappedPolicy)) {
    const { policySetupStatus } = mappedPolicy;
    payableTem.policySetupStatus = policySetupStatus;
  }

  if (
    formUtils.queryValue(payableTem.policySetupStatus) === PolicySetupStatus.NoImplement &&
    checkClaimPayableDuplicate(claimPayableListMap, { ...payableTem, productCode: value })
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000021' }));
  }
  callback();
};
