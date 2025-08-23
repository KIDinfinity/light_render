import lodash from 'lodash';
import { CLMCustomerType } from 'basic/enum/CLMCustomerType';

export default ({ item }: any) => {
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
