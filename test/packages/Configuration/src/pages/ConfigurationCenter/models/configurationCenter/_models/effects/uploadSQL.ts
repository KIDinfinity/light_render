import { importSqlScript } from '@/services/ccBusinessDataControllerService';
import { notification } from 'antd';
import { serialize as objectToFormData } from 'object-to-formdata';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';

export default function* ({ payload }: PayProps, { call }: SagaProps) {
  const response = yield call(
    importSqlScript,
    objectToFormData({
      datasourceName: payload.datasourceName,
      batchNumber: payload.batchNumber,
      fileName: payload.fileName,
      sqlCategory: payload.sqlCategory,
      file: payload.sqlFile,
    })
  );
  if (response && response.success) {
    notification.success({
      message: 'uploadSQL successfully!',
    });
  } else {
    showErrors(response && response.promptMessages);
  }
}
