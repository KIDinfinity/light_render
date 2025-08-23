import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { questionnaireSwitch } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    return lodash.set(draftState, 'questionnaireSwitch', questionnaireSwitch);
  });
  return {
    ...nextState,
  };
};
