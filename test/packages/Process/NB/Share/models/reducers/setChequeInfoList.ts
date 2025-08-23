import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { chequeInfoList } = lodash.pick(action?.payload, ['chequeInfoList']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'chequeInfoList', chequeInfoList);
  });

  return nextState;
};
