import { LIFEPAYABLE } from '../Utils/getAddInitData';
import { SwitchEnum } from '../Enum';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  payableId: string;
  extra: Object;
  claimPayableListMap: any;
}

export default (params: any) => {
  const { claimNo, id, incidentId, payableId, extra }: IProps = params;

  return {
    ...LIFEPAYABLE,
    claimNo,
    incidentId,
    payableId,
    manualAdd: SwitchEnum.YES,
    ...extra,
    id,
  };
};
