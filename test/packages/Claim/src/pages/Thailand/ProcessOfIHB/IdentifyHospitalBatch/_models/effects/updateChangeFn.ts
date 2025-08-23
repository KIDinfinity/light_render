import claimHospitalBillingBatchControllerService from '@/services/claimHospitalBillingBatchControllerService';
import handleMessageModal from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default function* updateChangeFn({ payload }: any, { call, put, select }: any) {
  const updateTotalInvoiceNo = payload?.isUpdateTotalInvoiceNo;
  const { invoiceInforData, basicInforData, discardedSubmissionIdList, removeInvoiceInfoList,discardedClaimNoList } =
    yield select((state: any) => ({
      invoiceInforData: state.IdentifyHospitalBatchController.claimProcessData.invoiceInforData,
      basicInforData: formUtils.cleanValidateData(
        state.IdentifyHospitalBatchController.claimProcessData.basicInforData
      ),
      discardedSubmissionIdList:
        state.IdentifyHospitalBatchController.claimProcessData.discardedSubmissionIdList,
      removeInvoiceInfoList:
        state.IdentifyHospitalBatchController.claimProcessData.removeInvoiceInfoList,
      discardedClaimNoList:
        state.IdentifyHospitalBatchController.claimProcessData.discardedClaimNoList,
    }));

  const newInvoiceInforSelRows = lodash.map(invoiceInforData, (item: any) => {
    const oldRegistrionObj = item.registration;
    const recordInfo: any = formUtils.objectQueryValue(item);
    recordInfo.registration = oldRegistrionObj;
    recordInfo.medicalProvider = basicInforData.medicalProvider;
    recordInfo.coverPageNo = formUtils.queryValue(basicInforData.coverPageNo);
    return recordInfo;
  });
  const response = yield call(claimHospitalBillingBatchControllerService.updateChange, {
    ...basicInforData,
    claimHospitalBillingDetails: newInvoiceInforSelRows,
    ...updateTotalInvoiceNo,
    discardedSubmissionIdList,
    discardedClaimNoList,
  });
  if (!response.success) {
    handleMessageModal(response.promptMessages);
  }
  return response;
}
