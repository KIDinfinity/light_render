import lodash from 'lodash';
import claimHospitalBillingBatchControllerService from '@/services/claimHospitalBillingBatchControllerService';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export default function* submitPaymentFn({ payload }: any, { call, put, select }: any) {
  const invoiceInforSelRows = yield select(
    (state: any) => state.IdentifyHospitalBatchController.claimProcessData.invoiceInforSelRows
  );
  if (invoiceInforSelRows && invoiceInforSelRows.length) {
    const validateInvoiceInforArr = yield put.resolve({
      type: 'validateInvoiceInfor',
      payload: {
        invoiceInfor: invoiceInforSelRows,
      },
    });
    const errTip = yield put.resolve({
      type: 'errTipFn',
      payload: {
        isCheckSettled: true,
      },
    });

    yield put({
      type: 'saveData',
      payload: {
        invoiceInforTip: '',
        submitforTip: '',
        submitPaymentforTip: errTip?.invoiceNotSettledTip,
      },
    });
    if (!validateInvoiceInforArr.length && errTip.invoiceNotSettledTip === '') {
      const basicInforData = yield select((state: any) =>
        formUtils.cleanValidateData(
          state.IdentifyHospitalBatchController.claimProcessData?.basicInforData
        )
      );
      const response = yield call(claimHospitalBillingBatchControllerService.submitPayment, {
        ...basicInforData,
        claimHospitalBillingDetails: lodash.map(invoiceInforSelRows, (item: any) =>
          formUtils.cleanValidateData({
            ...item,
            status: formUtils.queryValue(item.status),
            identityNo: formUtils.queryValue(item.identityNo),
            firstName: formUtils.queryValue(item.firstName),
            surname: formUtils.queryValue(item.lastName),
            lastName: formUtils.queryValue(item.lastName),
            coverPageNo: formUtils.queryValue(basicInforData.coverPageNo),
          })
        ),
      });

      if (response.success) {
        yield put({
          type: 'refreshInformation',
          payload: {
            taskId: payload?.taskId,
          },
        });
      } else {
        handleMessageModal(response.promptMessages);
      }
    }
  } else {
    yield put({
      type: 'saveData',
      payload: {
        invoiceInforTip: '',
        submitforTip: '',
        submitPaymentforTip: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000196' }),
      },
    });
  }
}
