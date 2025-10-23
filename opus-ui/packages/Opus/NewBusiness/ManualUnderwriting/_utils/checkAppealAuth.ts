import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { validateBusiness, permissionValidate } from '@/services/owbNbAppealControllerService';

export default (params: any) => {
  const {
    businessNo,
    caseNo = '',
    activityKey = '',
    caseCategory = '',
    platformCode = 'opus',
    operationType = 'validateReopen',
  } = params;

  const isNBHistory = window?.location?.pathname?.toLowerCase()?.includes('/nb/history');
  return new Promise(async (resolve, reject) => {
    const submitParams = isNBHistory
      ? { businessNo, caseNo, operationType }
      : {
          activityKey,
          businessNo,
          caseNo,
          caseCategory,
          platformCode,
          operationType,
        };
    const res = await validateBusiness(submitParams);
    if (res?.success === true) {
      resolve(res);
    } else {
      reject(res);
    }
  });
};
