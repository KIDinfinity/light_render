import { OTHERPROCEDUREITEMPAYABLE } from '../Utils/getAddInitData';
import { SwitchEnum } from '../Enum';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  otherProcedureId: string;
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
    otherProcedureId,
    payableId,
    treatmentPayableId,
    extra,
  }: IProps = params;

  return {
    ...OTHERPROCEDUREITEMPAYABLE,
    claimNo,
    incidentId,
    otherProcedureId,
    treatmentId,
    payableId,
    treatmentPayableId,
    manualAdd: SwitchEnum.YES,
    ...extra,
    id,
  };
};
