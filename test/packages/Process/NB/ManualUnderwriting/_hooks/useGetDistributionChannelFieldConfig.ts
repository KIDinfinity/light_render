import { useMemo } from 'react';
import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetPrimaryAgentChannel from 'process/NB/ManualUnderwriting/_hooks/useGetPrimaryAgentChannel';

export default ({ localConfig }) => {
  const config = useGetSectionAtomConfig({
    section: 'DistributionChannel-Field',
    localConfig,
  });
  const agentChannelCode = useGetPrimaryAgentChannel();
  return useMemo(() => {
    const configAddParam = (() => {
      if (lodash.isObject(config)) {
        const string: string = JSON.stringify(config);
        const replaceResult = string.replaceAll('$agentChannelCode', agentChannelCode);
        return safeParseUtil(replaceResult);
      }
      return config;
    })();
    return configAddParam;
  }, [config, agentChannelCode]);
};
