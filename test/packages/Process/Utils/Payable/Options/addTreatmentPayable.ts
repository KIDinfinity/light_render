import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { TREATMENTPAYABLEITEM } from '../Utils/getAddInitData';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  payableId: string;
  treatmentId: string;
  extra: any;
  treatmentListMap: any;
  invoiceListMap: any;
}

export default (params: any) => {
  const {
    claimNo,
    id,
    payableId,
    incidentId,
    treatmentId,
    treatmentListMap,
    invoiceListMap,
    extra,
  }: IProps = params;
  let expenseAmount = 0;

  const { invoiceList } = treatmentListMap?.[treatmentId];
  lodash.map(invoiceList, (invoiceId) => {
    const invoiceItem = invoiceListMap[invoiceId];
    expenseAmount = add(expenseAmount, formUtils.queryValue(invoiceItem?.expense));
  });
  return {
    ...TREATMENTPAYABLEITEM,
    claimNo,
    expenseAmount,
    incidentId,
    treatmentId,
    manualAdd: SwitchEnum.YES,
    ...extra,
    payableId,
    id,
  };
};
