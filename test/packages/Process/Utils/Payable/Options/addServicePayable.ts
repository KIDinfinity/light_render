import {v4 as uuidv4 } from 'uuid';
import { SERVICEPAYABLEITEM } from '../Utils/getAddInitData';
import { SwitchEnum } from '../Enum';

interface IProps {
  claimNo: string;
  id: string;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  serviceItemId: string;
  payableId: string;
  treatmentPayableId: string;
  invoicePayableId: string;
  extra: any;
  expense: string;
}

export default (params: any) => {
  const {
    claimNo,
    incidentId,
    treatmentId,
    invoiceId,
    serviceItemId,
    payableId,
    treatmentPayableId,
    invoicePayableId,
    expense,
    extra,
  }: IProps = params;

  return {
    ...SERVICEPAYABLEITEM,
    claimNo,
    incidentId,
    treatmentId,
    invoiceId,
    serviceItemId,
    payableId,
    treatmentPayableId,
    invoicePayableId,
    isAdjustment: extra?.isAdjustment,
    expenseAmount: expense,
    calculationAmount: expense,
    manualAdd: SwitchEnum.YES,
    ...extra,
    id: uuidv4(),
  };
};
