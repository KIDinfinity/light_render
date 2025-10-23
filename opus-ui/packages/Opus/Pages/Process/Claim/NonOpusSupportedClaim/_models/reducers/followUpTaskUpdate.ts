import { produce } from 'immer';
import lodash from 'lodash';

const followUpTaskUpdate = (state: any, action: any) => {
  const { changedFields, index } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.followUpInfoList = lodash
      .chain(state?.businessData?.followUpInfoList || [])
      .slice()
      .map((item, i) => {
        if (i === index) {
          return { ...item, ...changedFields };
        }

        return item;
      })
      .value();
  });

  return { ...nextState };
};

export default followUpTaskUpdate;
