import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Status } from '../../Enum';

const invoiceInforvalidateKeyArr: string[] = [
  'invoiceNo',
  'firstName',
  'lastName',
  'visitDate',
  'amount',
];
const invoiceInforvalidateStatus: string[] = ['status'];

export default function* getHospitalBillingByClaimNoData({ payload }: any, { select, put }: any) {
  const { businessData } = payload;
  const getTask = yield select((state: any) => state.processTask.getTask);
  const { caseCategory } = lodash.pick(getTask, ['businessNo', 'caseCategory']);
  const { claimHospitalBillingDetails: invoiceInforData, ...basicInforData } = businessData;
  const newInvoiceInforData = [];
  const { totalNoOfInvoice } = basicInforData;
  for (let i = 0, len = invoiceInforData?.length; i < len; i += 1) {
    const newItem = {
      key: i,
      isShowMore: false,
      ...invoiceInforData[i],
      amount: (invoiceInforData[i].amount += ''),
    };
    lodash.mapKeys(newItem, (val, key) => {
      if (lodash.includes(invoiceInforvalidateKeyArr, key) && (!val || val === '')) {
        newItem[key] = {
          value: val,
          errTip: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
        };
      }
      if (lodash.includes(invoiceInforvalidateStatus, key) && val === Status.Error) {
        newItem[key] = {
          value: val,
          errTip: formatMessageApi({ Label_COM_Message: newItem.errorMessage }),
        };
      }
    });
    newInvoiceInforData.push(newItem);
  }
  yield put({
    type: 'saveData',
    payload: {
      basicInforData,
      invoiceInforData: newInvoiceInforData,
      invoiceInforSelRows: [],
      caseCategory,
    },
  });
  if (totalNoOfInvoice !== 0 && lodash.isEmpty(invoiceInforData)) {
    yield put({
      type: 'addInvoiceItem',
      payload: {},
    });
  }
}
