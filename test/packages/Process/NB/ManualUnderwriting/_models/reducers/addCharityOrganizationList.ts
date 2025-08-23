import { produce }  from 'immer';
import { v4 as uuid } from 'uuid';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const charityOrganizationList =
      lodash.get(draftState, 'businessData.policyList[0].charityOrganizationList', []) || [];
    lodash.set(draftState, `businessData.policyList[0].charityOrganizationList`, [
      ...charityOrganizationList,
      {
        id: uuid(),
      },
    ]);
  });
  return {
    ...nextState,
  };
};
