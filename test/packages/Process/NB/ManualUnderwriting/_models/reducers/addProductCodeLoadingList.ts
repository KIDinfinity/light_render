import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { productCode } = action.payload;
  const id = uuidv4();

  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'businessData.policyList[0].coverageList',
      lodash.map(lodash.get(draftState, 'businessData.policyList[0].coverageList'), (item: any) => {
        if (item.coreCode === productCode && lodash.isEmpty(item?.coverageLoadingList)) {
          return {
            ...item,
            coverageLoadingList: [
              {
                id,
              },
            ],
          };
        }
        return item;
      })
    );
  });
  return {
    ...nextState,
  };
};
