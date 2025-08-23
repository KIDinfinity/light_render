import lodash from 'lodash';
import { CLMCustomerType } from 'basic/enum/CLMCustomerType';

interface IAction {
  payload: {
    activeClientId: string;
    activeCustomerType?: string;
    activeRole?: string;
  };
}

const customerTypeMapDataKey = {
  [CLMCustomerType.CUS001]: 'insuredPolicyIdList',
  [CLMCustomerType.CUS002]: 'ownerPolicyIdList',
  [CLMCustomerType.CUS003]: 'beneficiaryPolicyIdList',
  [CLMCustomerType.CUS005]: 'payorPolicyIdList',
  [CLMCustomerType.CUS007]: 'beneficiaryOwnerPolicyIdList',
};

export default (state: any, { payload }: IAction) => {
  const { activeClientId, activeCustomerType } = payload;

  const activeItem = lodash.find(state?.sideBarOverallList, { keyClientId: activeClientId });

  const {
    claimHistoryList,
    policyInfoList,
    posHistoryList,
    clientInfo,
    coverageList,
    insuredPolicyIdList,
    summaryCoverage,
  }: any = lodash.pick(activeItem, [
    'claimHistoryList',
    'policyInfoList',
    'posHistoryList',
    'clientInfo',
    'coverageList',
    'insuredPolicyIdList',
    'summaryCoverage',
  ]);

  const filterPolicyIdList: string[] = lodash
    .chain(activeCustomerType)
    .split(',')
    .compact()
    .map((item: string) => {
      return activeItem?.[customerTypeMapDataKey?.[item]];
    })
    .flatten()
    .compact()
    .value();
  return {
    ...state,
    claimHistoryList,
    policyInfoList: lodash.isEmpty(filterPolicyIdList)
      ? policyInfoList
      : lodash.filter(policyInfoList, (item: any) =>
          lodash.includes(filterPolicyIdList, item?.policyId)
        ),
    posHistoryList,
    clientInfo,
    activeClientId,
    coverageList,
    insuredPolicyIdList,
    summaryCoverage,
  };
};
