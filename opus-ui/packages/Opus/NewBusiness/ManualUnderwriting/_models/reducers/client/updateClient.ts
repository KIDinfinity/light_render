import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const entities = formUtils.cleanValidateData(draftState?.modalData?.entities);
    lodash.set(draftState, 'entities', entities);
  });
  return {
    ...nextState,
  };
};
