import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useEffect } from 'react';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import { useAgentList } from '../hooks';

export default () => {
  const needRefreshAgentInfo = useSelector(
    ({ [NAMESPACE]: namespacemodel }: any) => namespacemodel.needRefreshAgentInfo
  );

  const agentList = useAgentList();

  const dispatch = useDispatch();

  useEffect(() => {
    if (lodash.isNull(needRefreshAgentInfo)) {
      getGlobalConfig({ region: tenant.region(), codeType: 'needRefreshAgentInfo' }).then(
        (response) => {
          if (response.success && response.resultData) {
            const defaultValue = response.resultData[0]?.defaultValue ?? 'N';
            dispatch({
              type: `${NAMESPACE}/setNeedRefreshAgentInfo`,
              payload: { needRefreshAgentInfo: defaultValue },
            });
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (needRefreshAgentInfo === 'Y') {
      dispatch({ type: `${NAMESPACE}/updateBankStaffList`, payload: { agentList } });
    }
  }, [agentList, needRefreshAgentInfo]);
};
