import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, id, contactItemId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    lodash.set(draftState, 'stepsChange.ClientInfo', true);
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const contactInfoList = lodash.get(dataItem, 'contactInfoList', []) || [];

    const contactItemIndex = lodash.findIndex(
      contactInfoList,
      (item: any) => item.id === contactItemId
    );
    const contactItem = lodash.find(contactInfoList, (item) => item.id === contactItemId);
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].contactInfoList[${contactItemIndex}]`,
      {
        ...contactItem,
        ...changedFields,
      }
    );
  });
  return {
    ...nextState,
  };
};
