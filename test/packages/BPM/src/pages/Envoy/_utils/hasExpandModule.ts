import { safeParseUtil } from '@/utils/utils';
import lodash from 'lodash';

export default (reasonGroup: any) => {
  let displayConfig = reasonGroup?.reasonDetails?.[0]?.displayConfig;
  if (!displayConfig) return false;
  if (lodash.isString(displayConfig)) displayConfig = safeParseUtil(displayConfig);
  return Object.keys(displayConfig).some((key) => {
    if (key === 'envoyTo' || key === 'pendingMemo' || key === 'channelContent')
      return displayConfig[key].visible;
    return false;
  });
};
