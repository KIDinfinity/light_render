import lodash from 'lodash';
import { CLMCustomerType } from 'basic/enum/CLMCustomerType';

export default ({ item, clientRoles }: any) => {
  if (lodash.isArray(clientRoles) && !lodash.isEmpty(clientRoles) && item?.keyClientId) {
    const keyClientId = item?.keyClientId;
    return lodash
      .chain(clientRoles)
      .find((item: any) => item.clientId === keyClientId)
      .get('roleList', [])
      .value();
  }
  return lodash.compact([
    item?.ownerPolicyIdList && item?.ownerPolicyIdList?.length > 0 ? CLMCustomerType.CUS002 : '',
    item?.insuredPolicyIdList && item?.insuredPolicyIdList?.length > 0
      ? CLMCustomerType.CUS001
      : '',
    item?.beneficiaryPolicyIdList && item?.beneficiaryPolicyIdList?.length > 0
      ? CLMCustomerType.CUS003
      : '',
    item?.payorPolicyIdList && item?.payorPolicyIdList?.length > 0 ? CLMCustomerType.CUS005 : '',
    item?.beneficiaryOwnerPolicyIdList && item?.beneficiaryOwnerPolicyIdList?.length > 0
      ? CLMCustomerType.CUS007
      : '',
  ]);
};
