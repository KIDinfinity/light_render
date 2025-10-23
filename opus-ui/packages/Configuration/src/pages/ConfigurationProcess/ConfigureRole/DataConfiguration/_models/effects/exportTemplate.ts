import { exportTemplate } from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: any, { call }: any) {
  const { functionId } = payload;
  const response = yield call(exportTemplate, functionId);
  return response;
}
