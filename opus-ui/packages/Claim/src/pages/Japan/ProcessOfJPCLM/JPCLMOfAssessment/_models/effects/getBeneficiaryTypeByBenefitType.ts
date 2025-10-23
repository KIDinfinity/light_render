import claimJpBeneficiaryControllerService from '@/services/claimJpBeneficiaryControllerService';

export default function* getBeneficiaryTypeByBenefitType({ payload }: any, { call, put }: any) {
  const response = yield call(
    claimJpBeneficiaryControllerService.getBeneficiaryTypeByBenefitType,
    payload
  );
  if (response && response.success && response.resultData) {
    yield put({
      type: 'saveBenefitAndPayableTypeMap',
      payload: response.resultData,
    });
  }

  return response;
}
