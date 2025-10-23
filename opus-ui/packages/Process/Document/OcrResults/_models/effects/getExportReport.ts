import lodash from 'lodash';
import { exportReport } from '@/services/documentOcrControllerService';
import { notification } from 'antd';

export default function* getExportReport({ payload }: any, { call }: any) {
  const { reportData } = payload;
  const response = yield call(exportReport, JSON.stringify(reportData));
  if (!!response?.success) {
    notification.success({
      message: 'Download successfully!',
    });
  }
  return lodash.get(response, 'resultData');
}
