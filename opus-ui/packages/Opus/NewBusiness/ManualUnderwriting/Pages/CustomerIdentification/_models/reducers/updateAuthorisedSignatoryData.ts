import { produce } from 'immer';
import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default (state: any, action: Object) => {
  const { ASDeleteList, policyOwnerSelect, claimProcessData } = lodash.pick(state, [
    'ASDeleteList',
    'policyOwnerSelect',
    'claimProcessData',
  ]);

  const policyOwnerClientIndex = lodash
    .chain(claimProcessData)
    .get('policyList[0].clientInfoList')
    .findIndex((client: any) => {
      const roleList = lodash.map(client?.roleList, (roleItem) => roleItem.customerRole);
      return lodash.includes(roleList, CustomerRole.PolicyOwner);
    })
    .value();

  const currentIdentificationList = lodash
    .chain(claimProcessData)
    .get(`policyList[0].clientInfoList[${policyOwnerClientIndex}].identificationList`)
    .value();

  const filterIdentificationList = lodash.filter(
    currentIdentificationList,
    (iden: any) => !lodash.includes(ASDeleteList[policyOwnerSelect], iden?.id)
  );

  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState.claimProcessData,
      `policyList[0].clientInfoList[${policyOwnerClientIndex}].identificationList`,
      filterIdentificationList
    );
  });
  return {
    ...nextState,
  };
};
