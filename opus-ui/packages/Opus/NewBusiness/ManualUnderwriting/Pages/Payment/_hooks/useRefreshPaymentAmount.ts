import { useDispatch, useSelector } from 'dva';
import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';

export default () => {
  const dispatch = useDispatch();

  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData?.applicationNo,
    shallowEqual
  );

  useEffect(() => {
    if (!lodash.isNil(applicationNo)) {
      dispatch({
        type: `${NAMESPACE}/getRefreshPaymentAmount`,
        payload: {
          init: true,
        },
      });
    }
  }, [applicationNo]);
};
