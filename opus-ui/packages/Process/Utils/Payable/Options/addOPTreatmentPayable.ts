import { SwitchEnum } from 'claim/pages/utils/claim';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  payableId: string;
  treatmentId: string;
  extra: any;
  treatmentListMap: any;
  invoiceListMap: any;
  treatmentPayableId: string;
}

export default (params: any) => {
  const { claimNo, id, payableId, incidentId, treatmentId, treatmentPayableId, extra }: IProps =
    params;

  return {
    claimNo,
    incidentId,
    treatmentId,
    treatmentPayableId,
    manualAdd: SwitchEnum.YES,
    ...extra,
    payableId,
    id,
  };
};
