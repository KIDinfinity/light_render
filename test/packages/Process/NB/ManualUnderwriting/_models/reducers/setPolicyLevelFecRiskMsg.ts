import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { fecRiskMsg } = lodash.pick(action?.payload, ['fecRiskMsg']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'fecRiskMsg', fecRiskMsg);
  });
  return { ...nextState };
};
