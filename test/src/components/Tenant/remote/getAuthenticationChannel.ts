import { authenticationChannel } from '@/services/loginLogoutControllerService';

export default async () => {
  const response = await authenticationChannel();

  if (response?.success) {
    return response.resultData;
  }

  return null;
};
