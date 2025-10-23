import { scanConfigTableList } from '@/services/ccInspectionControllerService';

export default function* ({ payload }: any, { call, put }: any): any {
  const { formData } = payload;

  const response = yield call(scanConfigTableList, formData);

  return response;
}
