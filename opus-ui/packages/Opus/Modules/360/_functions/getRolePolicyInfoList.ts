import lodash from 'lodash';
import { CLMCustomerType } from 'basic/enum/CLMCustomerType';

interface IProps {
  sideBarOverallList: any;
  activeClientId: string;
  activeRole: string;
}

export default ({ sideBarOverallList, activeClientId, activeRole }: IProps) => {
  const {
    ownerPolicyIdList,
    insuredPolicyIdList,
    beneficiaryPolicyIdList,
    payorPolicyIdList,
    beneficiaryOwnerPolicyIdList,
    policyInfoList,
  } = lodash.find(sideBarOverallList, (el: any) => el.keyClientId === activeClientId) || {};

  const config = {
    [CLMCustomerType.CUS001]: insuredPolicyIdList,
    [CLMCustomerType.CUS002]: ownerPolicyIdList,
    [CLMCustomerType.CUS003]: beneficiaryPolicyIdList,
    [CLMCustomerType.CUS005]: payorPolicyIdList,
    [CLMCustomerType.CUS007]: beneficiaryOwnerPolicyIdList,
  };

  return (
    lodash
      .chain(policyInfoList)
      .reduce((arr: any, item: any) => {
        if (lodash.isEmpty(activeRole)) {
          return [...arr, item];
        }
        const filterList = config?.[activeRole] || [];
        if (!lodash.isEmpty(activeRole) && lodash.includes(filterList, item.policyId)) {
          return [...arr, item];
        }
        return arr;
      }, [])
      .value() || []
  );
};
