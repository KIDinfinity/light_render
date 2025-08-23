import { produce }  from 'immer';
import lodash from 'lodash';

const premiumPaymentMethodUpdate = (state: any, action: any) => {
  const { premiumPaymentMethod } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(draftState?.claimEntities?.payeeListMap, (item) => {
      lodash.forEach(item?.payeeContactList, (contact: any) => {
        lodash.set(contact, 'premiumPaymentMethod', premiumPaymentMethod);
      });
    });
  });
  return { ...nextState };
};

export default premiumPaymentMethodUpdate;
