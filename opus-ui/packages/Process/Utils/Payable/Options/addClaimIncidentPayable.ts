import { SwitchEnum } from 'claim/pages/utils/claim';
import { CLAIMINCIDENTPAYABLE } from '../Utils/getAddInitData';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  payableId: string;
  extra: any;
}

export default (params: any) => {
  const { claimNo, id, payableId, incidentId, extra }: IProps = params;

  return {
    ...CLAIMINCIDENTPAYABLE,
    claimNo,
    incidentId,
    manualAdd: SwitchEnum.YES,
    ...extra,
    payableId,
    id,
  };
};
