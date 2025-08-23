import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ bankStaffNo, id }: any) => {
  const dispatch = useDispatch();
  const bankStaffList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.uwProposalAgent?.bankList,
    shallowEqual
  );

  const servicingBranch = useMemo(() => {
    return lodash
      .chain(bankStaffList)
      .find((item) => item.bankStaffNo === bankStaffNo)
      .get('servicingBranch', '')
      .value();
  }, [bankStaffNo, bankStaffList]);

  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/setDistributionchannelSection`,
      payload: {
        changedFields: {
          servicingBranch,
        },
        id,
      },
    });
  }, [servicingBranch, id, dispatch]);
};
