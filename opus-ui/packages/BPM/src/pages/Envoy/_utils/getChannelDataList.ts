import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

export default (configs: any, role?: string) => {
  let curRoleConfigs;
  if (role) {
    curRoleConfigs = lodash
      .chain(configs?.roleChannelConfigs)
      .find({
        destRole: role,
      })
      .value();
  } else {
    curRoleConfigs = lodash.get(configs, 'configs[0]');
  }
  return lodash.map(curRoleConfigs?.channelTemplates, (item: any) => ({
    channel: item?.channel,
    enable: item?.enable,
    content: safeParseUtil(item?.template),
  }));
};
