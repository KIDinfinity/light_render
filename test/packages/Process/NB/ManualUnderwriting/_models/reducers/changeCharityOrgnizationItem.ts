import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, id } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    const charityOrganizationList =
      lodash.get(draftState, 'businessData.policyList[0].charityOrganizationList', []) || [];

    const newData = lodash.map(charityOrganizationList, (item: any) => {
      if (item?.id === id) {
        return {
          ...item,
          ...changedFields,
        };
      }
      return item;
    });

    lodash.set(draftState, 'businessData.policyList[0].charityOrganizationList', newData);
  });

  return {
    ...nextState,
  };
};
