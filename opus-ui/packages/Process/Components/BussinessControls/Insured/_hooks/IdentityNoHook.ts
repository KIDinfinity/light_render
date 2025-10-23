import { useDispatch, useSelector } from 'dva';
import { useState } from 'react';
import { formUtils } from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import lodash from 'lodash';
export default ({ NAMESPACE, form }: any) => {
  return tenant.region({
    [Region.TH]: () => {
      const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);
      const dispatch = useDispatch();
      const [keyDownStatus, setKeyDownStatus] = useState(false);
      const handlePolicyNo = () => {
        const identityType = formUtils.queryValue(form.getFieldValue('identityType'));
        const identityNo = formUtils.queryValue(form.getFieldValue('identityNo'));
        if (lodash.isEmpty(identityType)) return;
        dispatch({
          type: `${NAMESPACE}/saveSearchInsuredInfo`,
          payload: {
            changedFields: {
              policyId: null,
              identityType,
              identityNo,
            },
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
      const handleOnBlur = async () => {
        if (!keyDownStatus) {
          handlePolicyNo();
        }
      };
      const handleOnFocus = () => {
        setKeyDownStatus(false);
      };
      const handleKeyDown = (e: { keyCode: number }) => {
        if (e.keyCode === 13) {
          setKeyDownStatus(true);
          handlePolicyNo();
        }
      };

      return {
        onBlur: handleOnBlur,
        onFocus: handleOnFocus,
        onKeyDown: handleKeyDown,
      };
    },
    notMatch: () => ({}),
  });
};
