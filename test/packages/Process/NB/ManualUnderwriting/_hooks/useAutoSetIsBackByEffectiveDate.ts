import { useMemo, useCallback } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default () => {
  const dispatch = useDispatch();
  const originBizData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.originBizData,
    shallowEqual
  );
  const originEffectiveDate = useMemo(() => {
    const formItem = lodash.get(originBizData, 'policyList[0].effectiveDate', '');
    return moment(formUtils.queryValue(formItem)).format('L');
  }, [originBizData]);

  return useCallback(
    (effectiveDate: any) => {
      const changedDate = moment(effectiveDate).format('L');
      const date = new Date();
      const currentDate = moment(date).format('L');

      if (originEffectiveDate !== changedDate) {
        if (changedDate !== currentDate) {
          dispatch({
            type: `${NAMESPACE}/setPlanFieldData`,
            payload: {
              changedFields: {
                isBack: 'Y',
              },
            },
          });
        } else {
          dispatch({
            type: `${NAMESPACE}/setPlanFieldData`,
            payload: {
              changedFields: {
                isBack: 'N',
              },
            },
          });
        }
      }
    },
    [originEffectiveDate, dispatch]
  );
};
