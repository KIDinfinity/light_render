import lodash from 'lodash';
import { safeParseUtil } from '@/utils/utils';

export default (buttonParams: string) => {
  const params = safeParseUtil(buttonParams);
  const { variables = {}, activityVariables = {} } = lodash.pick(params, [
    'variables',
    'activityVariables',
  ]);

  return {
    ...variables,
    ...activityVariables,
  };
};
