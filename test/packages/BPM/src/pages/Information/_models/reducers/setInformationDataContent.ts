import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const informationDataContactContent = lodash.get(
    action,
    'payload.informationDataContactContent',
    []
  );
  const nextState = produce(state, (draftState: any) => {
    draftState.informationDataContactContent = informationDataContactContent;
  });
  return {
    ...nextState,
  };
};
