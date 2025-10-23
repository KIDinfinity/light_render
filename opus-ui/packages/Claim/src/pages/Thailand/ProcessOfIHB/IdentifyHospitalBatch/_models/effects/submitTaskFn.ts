import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { BOStatus, InvoiceStatus } from '../../Enum';
import caseCategory from 'basic/enum/CaseCategory/th';
export default function* submitTaskFn(_: any, { put, select }: any) {
  const invoiceInforData = yield select(
    (state: any) => state.IdentifyHospitalBatchController.claimProcessData.invoiceInforData
  );
  const category = yield select(
    (state: any) => state.IdentifyHospitalBatchController.claimProcessData.caseCategory
  );
  const errorArr = [];
  const selNotSettledInvoiceArr: string[] = [];
  const selBoStatusNotPassInvoiceArr: string[] = [];
  let err;
  if (category == caseCategory.TH_IHB_CTG01) {
    err = 'ERR_000211';
  }
  if (category == caseCategory.TH_IHA_CTG01) {
    err = 'ERR_000429';
  }
  if (invoiceInforData && invoiceInforData.length) {
    const validateInvoiceInforArr = yield put.resolve({
      type: 'validateInvoiceInfor',
      payload: {
        invoiceInfor: invoiceInforData,
      },
    });
    errorArr.push(...validateInvoiceInforArr);
    lodash.map(invoiceInforData, (item: any) => {
      const invoiceNo = formUtils.queryValue(item.invoiceNo);
      const invoiceStatus = formUtils.queryValue(item.status);
      const boStatus = formUtils.queryValue(item.boStatus);
      if (
        invoiceNo &&
        ((category == caseCategory.TH_IHB_CTG01 &&
          item.status !== InvoiceStatus.Paid &&
          item.status !== InvoiceStatus.Rejected &&
          item.status !== InvoiceStatus.Cancelled) ||
          (category == caseCategory.TH_IHA_CTG01 &&
            item.status !== InvoiceStatus.Paid &&
            item.status !== InvoiceStatus.Rejected &&
            item.status !== InvoiceStatus.Approved &&
            item.status !== InvoiceStatus.Cancelled))
      ) {
        selNotSettledInvoiceArr.push(invoiceNo);
      }
      if (
        invoiceNo &&
        invoiceStatus !== InvoiceStatus.Cancelled &&
        (boStatus === BOStatus.BOFail || lodash.isEmpty(boStatus))
      ) {
        selBoStatusNotPassInvoiceArr.push(invoiceNo);
      } else if (
        invoiceNo &&
        invoiceStatus === InvoiceStatus.Cancelled &&
        boStatus === BOStatus.BOFail
      ) {
        selBoStatusNotPassInvoiceArr.push(invoiceNo);
      }
    });
  }
  let invoiceNotSettledTip = '';
  if (selNotSettledInvoiceArr.length) {
    invoiceNotSettledTip = formatMessageApi(
      { Label_COM_WarningMessage: err },
      selNotSettledInvoiceArr.join(',')
    );
    errorArr.push('');
  } else if (selBoStatusNotPassInvoiceArr.length) {
    invoiceNotSettledTip = formatMessageApi(
      { Label_COM_WarningMessage: 'MSG_000937' },
      selBoStatusNotPassInvoiceArr.join(',')
    );
    errorArr.push('');
  }
  yield put({
    type: 'saveData',
    payload: {
      submitforTip: invoiceNotSettledTip,
      invoiceInforTip: invoiceNotSettledTip,
      submitPaymentforTip: '',
    },
  });
  return errorArr;
}
