import { listBenefitFactors } from '@/services/claimAssessmentPlanDataControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getListBenefitFactors({ payload }: any, { call, put }: any) {
  const { claimNo } = payload;

  const response = yield call(listBenefitFactors, objectToFormData({ claimNo }));

  if (response && response.success) {
    const listBenefitFactor = response.resultData;

    yield put({
      type: 'saveListBenefitFactor',
      payload: listBenefitFactor,
    });

    yield put({
      type: 'packFactorList',
    });
  }
}
