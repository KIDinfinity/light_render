import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

export default ({ config, role, channel }: any) => {
  const currentRoleChannelConfig = lodash
    .chain(config)
    .get('roleChannelConfigs', [])
    .find((item: any) => item.destRole === role)
    .value();

  const templateString = lodash
    .chain(currentRoleChannelConfig)
    .get('channelTemplates', [])
    .find((item) => item.channel === channel)
    .get('template')
    .value();
  const template = safeParseUtil(templateString);
  return template;
};
