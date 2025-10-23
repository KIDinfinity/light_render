import lodash from 'lodash';
import claimHospitalBillingBatchControllerService from '@/services/claimHospitalBillingBatchControllerService';
import { formUtils } from 'basic/components/Form';
import { subtract } from '@/utils/precisionUtils';
import handleMessageModal from '@/utils/commonMessage';
import { dateForUpdateChange } from '../../utils';

export default function* deleteSelRows({ payload }: any, { call, put, select }: any) {
  const {
    invoiceInforData,
    basicInforData,
    discardedSubmissionIdList,
    invoiceInforSelRows,
  } = yield select((state: any) => ({
    invoiceInforData: state.IdentifyHospitalBatchController.claimProcessData.invoiceInforData,
    basicInforData: formUtils.cleanValidateData(
      state.IdentifyHospitalBatchController.claimProcessData.basicInforData
    ),
    discardedSubmissionIdList:
      state.IdentifyHospitalBatchController.claimProcessData.discardedSubmissionIdList,
    invoiceInforSelRows:
      state.IdentifyHospitalBatchController?.claimProcessData?.invoiceInforSelRows,
  }));
  if (lodash.isEmpty(invoiceInforSelRows)) return {};
  const differenceData = lodash.differenceBy(invoiceInforData, invoiceInforSelRows, 'id');
  lodash.set(
    basicInforData,
    'totalNoOfInvoice',
    subtract(basicInforData?.totalNoOfInvoice, lodash.size(invoiceInforSelRows))
  );
  const newInvoiceInforSelRows = dateForUpdateChange(differenceData, basicInforData);
  const response = yield call(claimHospitalBillingBatchControllerService.updateChange, {
    ...basicInforData,
    claimHospitalBillingDetails: newInvoiceInforSelRows,
    discardedSubmissionIdList,
    updateTotalInvoiceNo: 1,
  });
  if (!response.success) {
    handleMessageModal(response.promptMessages);
  }
  if (response.success) {
    yield put({
      type: 'refreshInformation',
      payload: {
        taskId: payload?.taskId,
      },
    });
  }
  return response;
}
