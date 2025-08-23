import { useEffect, useState, useMemo } from 'react';
import lodash from 'lodash';
import useGetDisplayItemByTask from './useGetDisplayItemByTask';
import useGetIsAuthStatusCase from './useGetIsAuthStatusCase';
import { findBizProcess } from '@/services/bpmBusinessProcessService';

export default ({ taskDetail, processInstanceId, pathName }: any) => {
  // eslint-disable-next-line prefer-const
  let [response, setResponse] = useState(null);
  useEffect(() => {
    (async () => {
      if (processInstanceId) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const response = await findBizProcess({
          processInstanceId,
        });
        setResponse(response);
      }
    })();
  }, [processInstanceId]);
  const displayItem = useGetDisplayItemByTask({ response, taskDetail, processInstanceId });
  const isFullStp = useGetIsAuthStatusCase({ response, processInstanceId });
  return useMemo(() => {
    const routerVisisbleArr = ['claim/history', 'nb/history', 'servicing/history'];
    const routerVisible = lodash.some(routerVisisbleArr, (el: any) => {
      const r = lodash.includes(window.location?.pathname, el);
      return r;
    });

    if (routerVisible) {
      return {
        showInformation: true,
        showInsured: true,
        showPending: true,
        showTools: true,
        showIntegration: true,
      };
    }
    return {
      showInformation: displayItem?.information === 0 || isFullStp || false,
      showPending: displayItem?.envoy === 0 || isFullStp || false,
      showInsured: displayItem?.insured === 0 || isFullStp || false,
      showTools: true,
      showIntegration: !!processInstanceId,
    };
  }, [displayItem, taskDetail, isFullStp, pathName]);
};
