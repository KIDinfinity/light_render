import { useCallback } from 'react';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import useGetPrimaryAgentChannel from 'process/NB/ManualUnderwriting/_hooks/useGetPrimaryAgentChannel';

export default () => {
  const agentChannelCode = useGetPrimaryAgentChannel();
  return useCallback(
    (config: any) => {
      const configAddParam = (() => {
        if (lodash.isObject(config)) {
          const string: string = JSON.stringify(config);
          const replaceResult = string.replaceAll('$agentChannelCode', agentChannelCode);
          return safeParseUtil(replaceResult);
        }
        return config;
      })();
      return configAddParam;
    },
    [agentChannelCode]
  );
};
