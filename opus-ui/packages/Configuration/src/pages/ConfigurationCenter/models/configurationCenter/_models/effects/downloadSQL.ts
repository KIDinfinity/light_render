import { notification } from 'antd';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';

export default function* ({ payload }: PayProps, { call, select }: SagaProps) {
  // const response = yield call(
  //   downloadForConfigTable
  // );
  const response = { success: true, promptMessages: [] };

  if (response && response.success) {
    notification.success({
      message: 'downloadSQL successfully!',
    });
  } else {
    showErrors(response && response.promptMessages);
  }
}
