import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { id } = lodash.pick(payload, ['id']);
  const nextState = produce(state, (draftState: any) => {
    const charityOrganizationList =
      lodash.get(draftState, 'businessData.policyList[0].charityOrganizationList', []) || [];
    lodash.set(
      draftState,
      `businessData.policyList[0].charityOrganizationList`,
      lodash.filter(charityOrganizationList, (item: any) => item.id !== id)
    );
  });
  return {
    ...nextState,
  };
};
