import { PROCEDUREITEMPAYABLE } from '../Utils/getAddInitData';
import { SwitchEnum } from '../Enum';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  procedureId: string;
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
    procedureId,
    payableId,
    treatmentPayableId,
    extra,
  }: IProps = params;

  return {
    ...PROCEDUREITEMPAYABLE,
    claimNo,
    incidentId,
    procedureId,
    treatmentId,
    payableId,
    treatmentPayableId,
    manualAdd: SwitchEnum.YES,
    ...extra,
    id,
  };
};
