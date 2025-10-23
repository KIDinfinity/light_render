import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getTelNo } from '../../_function';

const initPayeeItem = (state: any, action: any) => {
  const { payeeId, countryCode } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { payeeList } = draftState.claimData;

    draftState.claimData.payeeList = payeeList.map((item: any) => ({
      ...item,
      payeeContactList:
        item.id === payeeId
          ? lodash.map(item?.payeeContactList, (el: any) => {
              return {
                ...el,
                telNo: getTelNo({
                  value: el.telNo,
                  contactType: formUtils.queryValue(el.contactType),
                  paymentMethod: formUtils.queryValue(item.paymentMethod),
                  countryCode,
                }),
              };
            })
          : item.payeeContactList,
    }));
  });

  return { ...nextState };
};

export default initPayeeItem;
