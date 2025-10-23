import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

export default function* fetchClientInfoList(_: any, { call, put, select }: any) {
  const insuredInfo = yield select(
    (state) => state.opusNonOpusClaimManagement?.businessData?.insured
  );

  const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
  const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
  const params = {
    insured: { insuredId, policyId },
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    yield put({
      type: 'saveClientInfoList',
      payload: {
        clientInfoList: resultData?.clientInfoList,
      },
    });

    yield put({
      type: 'saveC360PolicyInfo',
      payload: {
        c360PolicyInfo: resultData || {},
      },
    });
  }
}
