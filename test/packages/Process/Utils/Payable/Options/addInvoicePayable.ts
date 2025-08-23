import { INVOICEPAYABLEITEM } from '../Utils/getAddInitData';
import { SwitchEnum } from '../Enum';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  invoiceId: string;
  payableId: string;
  treatmentPayableId: string;
  treatmentId: string;
  extra: Object;
  claimPayableListMap: any;
  expenseAmount: string;
}

export default (params: any) => {
  const {
    claimNo,
    id,
    incidentId,
    treatmentId,
    invoiceId,
    payableId,
    treatmentPayableId,
    expenseAmount,
    extra,
  }: IProps = params;

  return {
    ...INVOICEPAYABLEITEM,
    claimNo,
    incidentId,
    invoiceId,
    treatmentId,
    payableId,
    treatmentPayableId,
    manualAdd: SwitchEnum.YES,
    expenseAmount,
    ...extra,
    id,
  };
};
