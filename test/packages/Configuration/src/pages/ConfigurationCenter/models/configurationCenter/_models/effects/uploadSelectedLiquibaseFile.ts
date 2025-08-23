import {
  downloadByFileName
} from '@/services/ccLiquibaseDownloadControllerService';
import { notification } from 'antd';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';


export default function* (_: PayProps, { select,call,put }: SagaProps) {
  const { selectedLiquibaseFileName:fileName } = yield select((state: any) => state.configurationCenter);
  const response = yield call(
    downloadByFileName,
    {fileName}
  );
  if (response && response.success) {
    notification.success({
      message: 'downloadByFileName successfully!',
    });
    yield put({
      type: 'hideLiquibaseFileModal',
    });
  } else {
    showErrors(response && response.promptMessages);
  }
}




