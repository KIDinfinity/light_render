import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { InvoiceStatus } from '../../Enum';

export default function* errTipFn({ payload }: any, { select }: any) {
  const { isCheckScannedOrError, isCheckType, isCheckSettled, isCheckDiagnosisType } = payload;
  const invoiceInforSelRows = yield select(
    (state: any) => state.IdentifyHospitalBatchController.claimProcessData.invoiceInforSelRows
  );
  const selNotScannedInvoiceArr: string[] = [];
  const selTypeIsNullInvoiceArr: string[] = [];
  const selNotSettledInvoiceArr: string[] = [];
  const diagnosisNotTypeIsPrimaryTipArr: any = [];
  lodash.map(invoiceInforSelRows, (item: any) => {
    const status = formUtils.queryValue(item.status);
    if (
      isCheckScannedOrError &&
      status !== InvoiceStatus.Scanned &&
      status !== InvoiceStatus.Error &&
      item?.matchResult !== 0
    ) {
      selNotScannedInvoiceArr.push(item.invoiceNo);
    }
    if (isCheckType && (!item.type || item.type === '')) {
      selTypeIsNullInvoiceArr.push(item.invoiceNo);
    }
    if (isCheckSettled && status !== InvoiceStatus.Approved) {
      selNotSettledInvoiceArr.push(item.invoiceNo);
    }
    // const diagNosisTypeArr: string[] = [];
    // if (isCheckDiagnosisType && item.type === InvoiceType.OPD && item?.matchResult === 0) {
    //   const diagnosisList = lodash.get(item, 'registration.incidentList[0].diagnosisList', []);
    //   lodash.forEach(diagnosisList, (diagnosisItem: any) => {
    //     diagNosisTypeArr.push(diagnosisItem.diagnosisType);
    //   });
    //   if (!lodash.includes(diagNosisTypeArr, DiagnosisType.Primary)) {
    //     diagnosisNotTypeIsPrimaryTipArr.push({
    //       key: item.key,
    //       text: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000183' }),
    //     });
    //   }
    // }
  });
  let invoiceNotScannedOrErrorTip = '';
  let invoiceTypeIsNullTip = '';
  let invoiceNotSettledTip = '';
  if (selNotScannedInvoiceArr.length) {
    invoiceNotScannedOrErrorTip = formatMessageApi(
      { Label_COM_WarningMessage: 'ERR_000190' },
      selNotScannedInvoiceArr.join(',')
    );
  }
  if (selTypeIsNullInvoiceArr.length) {
    invoiceTypeIsNullTip = formatMessageApi(
      { Label_COM_WarningMessage: 'ERR_000191' },
      selTypeIsNullInvoiceArr.join(',')
    );
  }
  if (selNotSettledInvoiceArr.length) {
    invoiceNotSettledTip = formatMessageApi(
      { Label_COM_WarningMessage: 'ERR_000192' },
      selNotSettledInvoiceArr.join(',')
    );
  }
  return {
    invoiceNotScannedOrErrorTip,
    invoiceTypeIsNullTip,
    invoiceNotSettledTip,
    diagnosisNotTypeIsPrimaryTipArr,
  };
}
