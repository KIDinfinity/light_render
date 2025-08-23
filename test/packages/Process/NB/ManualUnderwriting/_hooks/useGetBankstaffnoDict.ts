import lodash from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const businessNo = useSelector(
    (state: any) => state?.[NAMESPACE]?.taskDetail.businessNo,
    shallowEqual
  );
  const agentList = useSelector(
    (state: any) => state?.[NAMESPACE]?.businessData.agentList,
    shallowEqual
  );
  const requestData = lodash.map(agentList, (item) => {
    const { agentNo, agentType } = lodash.pick(item, ['agentNo', 'agentType']);
    return {
      agentType: formUtils.queryValue(agentType),
      agentNo: formUtils.queryValue(agentNo),
      applicationNo: businessNo,
    };
  });
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAgentBankList`,
      payload: {
        requestData,
      },
    });
  }, []);
};
