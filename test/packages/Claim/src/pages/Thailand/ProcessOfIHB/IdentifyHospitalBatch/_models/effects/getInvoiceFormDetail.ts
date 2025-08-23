import lodash from 'lodash';
import claimHospitalBillingBatchControllerService from '@/services/claimHospitalBillingBatchControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import addDiagnosisItem from '../reducers/addDiagnosisItem';
import addMainBenefitItem from '../reducers/addMainBenefitItem';

export default function* getInvoiceFormDetail({ payload }: any, { call, put, select }: any) {
  const { invoiceInforData, idx } = payload;
  const response = yield call(
    claimHospitalBillingBatchControllerService.getRegistration,
    objectToFormData({
      submissionId: invoiceInforData[idx]?.submissionId,
    })
  );
  const state = yield select(
    ({ IdentifyHospitalBatchController }) => IdentifyHospitalBatchController
  );
  const resultData = lodash.get(response, 'resultData');
  if (lodash.get(response, 'success')) {
    let result = resultData;
    if (lodash.isEmpty(resultData)) {
      result = addDiagnosisItem(state, { payload: { idx } });
      result = addMainBenefitItem(result, { payload: { idx } });
      result = result?.claimProcessData?.invoiceInforData?.[idx]?.registration;
    }
    invoiceInforData[idx].registration = result;
  }
  return invoiceInforData;
}
