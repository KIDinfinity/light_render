import lodash from 'lodash';
import { reloadInsureInfo as reload } from '@/services/claimC360PolicyControllerService';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { Action } from '@/components/AuditLog/Enum';
export default function* reloadInsureInfo({ payload }: any, { call, put, select }: any) {
  const { caseCategory } = payload;
  const {
    claimNo,
    insured: { identityNo, identityType },
  } = yield select((state: any) => state?.daOfClaimCaseController?.claimProcessData);
  const response = yield call(reload, {
    claimNo,
    regionCode: tenant.region(),
    caseCategory,
    identityNo: formUtils.queryValue(identityNo),
    identityType: formUtils.queryValue(identityType),
  });
  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const insuredData = response.resultData;
    yield put({
      type: 'setInsured',
      payload: insuredData,
    });
    yield put({
      type: 'auditLogController/logButton',
      payload: {
        action: Action.Reload,
      },
    });
  }
  return response;
}
