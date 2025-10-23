import { produce } from 'immer';
import lodash from 'lodash';

const claimProcessDataResetByField = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { fields } = action.payload;
    const newObj = lodash.reduce(
      fields,
      (prev, curr) => ({ ...prev, [curr]: draftState.businessData.claimProcessData[0]?.[curr] }),
      Object({})
    );
    draftState.businessData.claimProcessData[0] = newObj;
  });
  return { ...nextState };
};

export default claimProcessDataResetByField;
