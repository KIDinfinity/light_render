import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { showPaymentTransferModal } = lodash.pick(action?.payload, ['showPaymentTransferModal']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'showPaymentTransferModal', showPaymentTransferModal);
  });
  return {
    ...nextState,
  };
};
