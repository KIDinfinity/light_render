import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import TaskDefKey from 'enum/TaskDefKey';

export default ({ NAMESPACE, form }: any) => {
  return tenant.region({
    [Region.TH]: () => {
      const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);
      const dispatch = useDispatch();

      if (taskDetail?.taskDefKey === TaskDefKey.TH_CLM_ACT001) {
        const handlePolicyNo = (identityType: string) => {
          const identityNo = formUtils.queryValue(form.getFieldValue('identityNo'));
          if (lodash.isEmpty(identityType) || lodash.isEmpty(identityNo)) {
            return;
          }
          dispatch({
            type: `${NAMESPACE}/saveSearchInsuredInfo`,
            payload: {
              changedFields: { identityType, identityNo },
            },
          });
          dispatch({
            type: `${NAMESPACE}/getInsuredInfo`,
            payload: {
              searchByPolicyId: true,
              caseCategory: taskDetail?.caseCategory,
            },
          });
        };

        return {
          onChange: handlePolicyNo,
        };
      }

      return {};
    },
    notMatch: () => ({}),
  });
};
