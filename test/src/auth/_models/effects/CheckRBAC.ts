import { checkUserIfOwnResources } from '@/services/rbac2ResourceControllerService';

export default function* ({ payload }: any, { call, select }: any) {
  const { resourceCodes } = payload;
  const response = yield call(checkUserIfOwnResources, resourceCodes);
  if (response?.success) {
    return response?.resultData;
  }
}
