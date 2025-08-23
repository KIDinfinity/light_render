import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import getTelNo from '../functions/getTelNo';

const initPayeeItem = (state: any, action: any) => {
  const { payeeId, countryCode } = action.payload;

  const nextState = produce(state, (draftState) => {
    const item = draftState.claimEntities.payeeListMap[payeeId];

    const { contactType, paymentMethod } = formUtils.cleanValidateData(item);
    draftState.claimEntities.payeeListMap[payeeId] = {
      ...item,
      payeeContactList: lodash.map(item?.payeeContactList, (el: any) => {
        return {
          ...el,
          telNo: getTelNo({
            value: formUtils.queryValue(el.telNo) || '',
            contactType: contactType || formUtils.queryValue(el.contactType),
            paymentMethod,
            countryCode,
          }),
        };
      }),
    };
  });

  return { ...nextState };
};

export default initPayeeItem;
