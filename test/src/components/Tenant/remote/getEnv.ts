import lodash from 'lodash';
import { getEnvProfile } from '@/services/loginLogoutControllerService';

export default async () => {
  const response = await getEnvProfile();

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return response.resultData;
  }

  return {};
};
