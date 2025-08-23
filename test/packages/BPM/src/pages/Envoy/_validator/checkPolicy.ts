import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getIsRequired from 'bpm/pages/Envoy/_utils/getIsRequired';

const checkPolicy = (errObj: any, reason: any, thPendPolicyReasonInfo: any, isSend: boolean) => {
  const sortModuleArr = getSortModuleArr(reason?.displayConfig);
  const hasPolicy = lodash.some(sortModuleArr, (module: any) => module.moduleName === 'policy');
  if (hasPolicy && isSend) {
    const { policy } = reason;
    lodash.forEach(policy, (item: any, idx: number) => {
      const { reasonList, date, otherReason } = item;
      if (!reasonList?.length) {
        errObj[`policy{${idx}}_reasonList`] = [
          formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
        ];
      } else {
        errObj[`policy{${idx}}_reasonList`] = [];
      }
      const { requiredDate, requiredOtherReason } = getIsRequired(
        thPendPolicyReasonInfo,
        reasonList
      );
      if (requiredDate && lodash.isEmpty(date)) {
        errObj[`policy{${idx}}_date`] = [
          formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
        ];
      } else {
        errObj[`policy{${idx}}_date`] = [];
      }
      if (requiredOtherReason && lodash.isEmpty(otherReason)) {
        errObj[`policy{${idx}}_otherReason`] = [
          formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
        ];
      }
    });
  }
  return errObj;
};

export default checkPolicy;
