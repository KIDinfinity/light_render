import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { CLAIMPAYABLEITEM } from '../Utils/getAddInitData';
import { SwitchEnum } from '../Enum';

interface IProps {
  claimNo: string;
  incidentId: string;
  id: string;
  extra: Object;
  claimPayableListMap: any;
}

export default (params: any) => {
  const { claimNo, incidentId, id, claimPayableListMap, extra }: IProps = params;

  const getViewOrderMax = (claimPayableListMap: any) => {
    const viewOrderMax: number = lodash
      .chain(claimPayableListMap)
      .map((item) => item)
      .maxBy('viewOrder')
      .value()?.viewOrder;

    return lodash.isNil(viewOrderMax) ? add(viewOrderMax, 1) : 1;
  };
  return {
    ...CLAIMPAYABLEITEM,
    claimNo,
    incidentId,
    manualAdd: SwitchEnum.YES,
    viewOrder: getViewOrderMax(claimPayableListMap),
    ...extra,
    id,
  };
};
