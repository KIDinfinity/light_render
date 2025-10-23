import { produce } from 'immer';
import lodash from 'lodash';

const saveServiceItemFeesListMap = (
  state: any,
  { payload: { serviceItemFeesListMap, incidentId } }: any
) => {
  return produce(state, (draftState: any) => {
    if (lodash.size(serviceItemFeesListMap) > 1) {
      draftState.serviceItemFeesListMap[incidentId] = {};
    }

    lodash.map(serviceItemFeesListMap, (item: any) => {
      if (incidentId && item?.serviceItemCode) {
        draftState.serviceItemFeesListMap[incidentId] = {
          ...(draftState.serviceItemFeesListMap[incidentId] || {}),
          [item.serviceItemCode]: lodash
            .chain(item?.serviceItemFeeList)
            .map('feeCode')
            .map((feeItem: any) => {
              return { dictCode: feeItem };
            })
            .value(),
        };
      }
    });
  });
};

export default saveServiceItemFeesListMap;
