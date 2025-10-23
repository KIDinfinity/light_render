import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const distributionChannelList = useSelector((state) =>
    lodash.get(state, `${NAMESPACE}.modalData.distributionChannel.distributionChannelList`)
  );

  const bankStaffList = useSelector(
    (state) => lodash.get(state, `${NAMESPACE}.modalData.distributionChannel.bankStaffList`),
    shallowEqual
  );

  return useCallback(
    (bankStaffNo: string) => {
      const agentNo = formUtils.queryValue(
        lodash.chain(distributionChannelList).get(id).get('agentNo').value()
      );
      const bankList = lodash.chain(bankStaffList).get(agentNo).get('bankList', []).value();
      const { bankStaffRefName, servicingBranch } = lodash
        .chain(bankList)
        .find((item: any) => item?.bankStaffNo === bankStaffNo)
        .pick(['bankStaffRefName', 'servicingBranch'])
        .value();
      dispatch({
        type: `${NAMESPACE}/updateDistributionChannel`,
        payload: {
          distributionChannel: {
            servicingBranch,
            id,
            bankStaffRefName,
          },
        },
      });
    },
    [bankStaffList, id, dispatch, distributionChannelList]
  );
};
