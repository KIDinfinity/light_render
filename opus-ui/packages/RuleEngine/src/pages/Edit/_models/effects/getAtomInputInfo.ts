import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { getAtomInputInfo } from '@/services/ruleEngineRuleAtomConfControllerService';

export default function* (action: any, { call, put }: any) {
  const { atomCode, moduleCode } = action.payload;

  const response: any = yield call(getAtomInputInfo, {
    moduleCode,
    atomCode: lodash.isArray(atomCode) ? atomCode : [atomCode],
    regionCode: tenant.region(),
  });

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    !lodash.isEmpty(response.resultData) &&
    lodash.isArray(response.resultData)
  ) {
    yield put({
      type: 'saveAtomInputInfo',
      payload: {
        list: response.resultData,
      },
    });
  }
}
