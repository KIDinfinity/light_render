import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const distributionChannelList = useSelector((state) =>
    lodash.get(state, `${NAMESPACE}.modalData.distributionChannel.distributionChannelList`)
  );

  const bankStaffList = useSelector(
    (state) => lodash.get(state, `${NAMESPACE}.modalData.distributionChannel.bankStaffList`),
    shallowEqual
  );

  const servicingBranchList = useSelector((state) =>
    lodash.get(state, `${NAMESPACE}.modalData.distributionChannel.servicingBranchList`)
  );

  const branchCodeList = useSelector((state) =>
    lodash.get(state, `${NAMESPACE}.modalData.distributionChannel.branchCodeList`)
  );

  const agentNo = formUtils.queryValue(
    lodash.chain(distributionChannelList).get(id).get('agentNo').value()
  );
  const branchList = tenant.region({
    [Region.ID]: () => {
      return lodash.map(servicingBranchList?.[agentNo] ?? [], (item: any) => {
        return {
          dictCode: item.branchId,
          dictName: item.branchName,
        };
      });
    },
    [Region.KH]: () => branchCodeList,
    notMatch: () => [],
  });

  return useCallback(
    (bankStaffNo: string) => {
      const bankList = lodash.chain(bankStaffList).get(agentNo).get('bankList', []).value();
      const { bankStaffRefName, servicingBranch } = lodash
        .chain(bankList)
        .find((item: any) => item?.bankStaffNo === bankStaffNo)
        .pick(['bankStaffRefName', 'servicingBranch'])
        .value();
      dispatch({
        type: `${NAMESPACE}/updateDistributionChannel`,
        payload: {
          changedFields: {
            servicingBranch,
            id,
            bankStaffRefName,
            servicingBranchDesc: lodash.find(branchList, { dictCode: servicingBranch })?.dictName,
          },
        },
      });
    },
    [bankStaffList, id, dispatch, branchList, agentNo]
  );
};
