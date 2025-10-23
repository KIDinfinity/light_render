import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { riderPlanCodeList } = payload || {};
  
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'riderProductCodeList', riderPlanCodeList);
  });
  return {
    ...nextState,
  };
};
