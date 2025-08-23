import {v4 as uuidv4 } from 'uuid';
import { ACCIDENT_BENEFIT_PAYABLE_ITEM } from '../Utils/getAddInitData';
import { SwitchEnum } from '../Enum';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  payableId: string;
  treatmentPayableId: string;
  treatmentId: string;
  extra: Object;
  claimPayableListMap: any;
}

export default (params: any) => {
  const { claimNo, incidentId, treatmentId, payableId, treatmentPayableId, extra }: IProps = params;

  return {
    ...ACCIDENT_BENEFIT_PAYABLE_ITEM,
    claimNo,
    payableId,
    treatmentPayableId,
    incidentId,
    treatmentId,
    manualAdd: SwitchEnum.YES,
    ...extra,
    id: uuidv4(),
  };
};
