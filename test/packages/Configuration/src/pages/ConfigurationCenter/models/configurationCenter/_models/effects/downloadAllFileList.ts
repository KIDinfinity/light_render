import {
  downloadForConfigTable
} from '@/services/ccLiquibaseDownloadControllerService';
import { notification } from 'antd';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';


export default function* ({ payload }: PayProps,  { call }: SagaProps) {
  const response = yield call(
    downloadForConfigTable
  );
  if (response && response.success) {
    notification.success({
      message: 'downloadForConfigTable successfully!',
    });
  } else {
    showErrors(response && response.promptMessages);
  }
}



