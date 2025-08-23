import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState.modalData.processData,
      'takeOver',
      draftState?.modalData?.takeOver
    );
  });
  return { ...nextState };
};
