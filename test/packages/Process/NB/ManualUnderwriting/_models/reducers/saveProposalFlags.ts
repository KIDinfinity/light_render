import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { needPremRecal, newSiRequired, needResendCol } = lodash.pick(action?.payload, [
    'needPremRecal',
    'newSiRequired',
    'needResendCol',
  ]);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'needPremRecal', needPremRecal);
    lodash.set(draftState, 'newSiRequired', newSiRequired);
    lodash.set(draftState, 'needResendCol', needResendCol);
  });
  return {
    ...nextState,
  };
};
