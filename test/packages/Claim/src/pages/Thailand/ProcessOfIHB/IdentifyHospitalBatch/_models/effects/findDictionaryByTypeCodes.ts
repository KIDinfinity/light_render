import lodash from 'lodash';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';

export default function* findDictionaryByTypeCode(_: any, { call, put }: any) {
  const response = yield call(miscDictionaryControllerService.findDictionaryByTypeCodes, [
    'CauseOfIncident',
    'DiagnosisType',
    'MainBenefit',
    'hospitalBillingType',
    'Dropdown_CLM_HospitalInvoiceStatus',
    'Dropdown_CLM_SubClaimType_IPD',
    'Dropdown_CLM_SubClaimType_OPD',
    'Dropdown_CLM_HospitalBOStatus',
  ]);
  if (lodash.get(response, 'success')) {
    const resultData = lodash.get(response, 'resultData');
    yield put({
      type: 'saveData',
      payload: {
        causeOfIncident: resultData?.CauseOfIncident,
        diagnosisType: resultData?.DiagnosisType,
        mainBenefit: resultData?.MainBenefit,
        hospitalBillingType: resultData?.hospitalBillingType,
        Dropdown_CLM_HospitalInvoiceStatus: resultData?.Dropdown_CLM_HospitalInvoiceStatus,
        Dropdown_CLM_SubClaimType_IPD: resultData?.Dropdown_CLM_SubClaimType_IPD,
        Dropdown_CLM_SubClaimType_OPD: resultData?.Dropdown_CLM_SubClaimType_OPD,
        Dropdown_CLM_HospitalBOStatus: resultData?.Dropdown_CLM_HospitalBOStatus,
      },
    });
  }
  return response;
}
