import { useMemo } from 'react';
import useGetScenarioMode from './useGetScenarioMode';
import { centerRequest } from '@/services/monitorCenterControllerService';
import { monitorParams } from '../../utils';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import ActionType from 'navigator/pages/Home/Monitor/Scenario/Enum/ActionType';
import { batchReSubmit } from '@/services/navigatorCaseOperationControllerService';
import { retryCaseStuckAtAutoActivity } from '@/services/integrationRetryControllerService';
import { findAutoActivityCase } from '@/services/dcProcessAutoActivityControllerService';
import { MonitorItemCode } from '../../enum';
import { safeParseUtil } from '@/utils/utils';

export default () => {
  const mode = useGetScenarioMode();
  return useMemo(() => {
    if ([ScenarioMode.EXPAND, ScenarioMode.COLLAPSE].includes(mode)) {
      return {
        [ActionType.SEARCH]: (params: any) => {
          return findAutoActivityCase(params);
        },
        [ActionType.RETRY]: (params: any) => {
          return retryCaseStuckAtAutoActivity(params);
        },
        [ActionType.RESUBMIT]: (params: any) => {
          return batchReSubmit(params);
        },
      };
    }
    return {
      [ActionType.SEARCH]: async (params: any) => {
        const response: any = await centerRequest(
          ...monitorParams(MonitorItemCode.tools_query_exceptional_case, params)
        );
        return safeParseUtil(response.responseData.resultData) || {};
      },
      [ActionType.RETRY]: (params: any) => {
        return centerRequest(
          ...monitorParams(MonitorItemCode.tools_batch_retry_stuck_auto_activity_case, params)
        );
      },
      [ActionType.RESUBMIT]: (params: any) => {
        return centerRequest(
          ...monitorParams(MonitorItemCode.tools_batch_resubmit_stuck_auto_activity_case, params)
        );
      },
    };
  }, [mode]);
};
