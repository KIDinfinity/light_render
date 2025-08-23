import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default (state: any) => {
  const id = uuidv4();
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList =
      lodash.get(draftState, 'businessData.policyList[0].clientInfoList', []) || [];
    const isInfoItemIncludeAuthorisedSignatory = lodash.some(clientInfoList, (item) => {
      return lodash
        .chain(item)
        .get('roleList')
        .filter(roleData => !roleData.deleted)
        .map((role: any) => role.customerRole)
        .includes(CustomerRole.AuthorisedSignatory)
        .value();
    })
    if (!isInfoItemIncludeAuthorisedSignatory) {
      lodash.set(draftState, 'businessData.policyList[0].clientInfoList', [
        {
          id,
          roleList: [{customerRole:'CUS011'}],
        },
        ...clientInfoList,
      ]);
    }
  });
  return { ...nextState };
};
