import {
  queryAllFileList
} from '@/services/ccLiquibaseDownloadControllerService';

import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';


export default function* ({ payload }: PayProps,  { put,call }: SagaProps) {
  const response = yield call(
    queryAllFileList
  );
  if (response && response.success) {
    if(response.resultData&&response.resultData.length){
      yield put({
        type: 'saveLiquibaseFile',
        payload: {
          liquibaseFiles:response.resultData,
          showLiquibaseFileModal: true,
        },
      });
    }
  } else {
    showErrors(response && response.promptMessages);
  }
}




