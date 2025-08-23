import lodash from 'lodash';
import { notification } from 'antd';
import { updateDocInfo } from '@/services/docManagementControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { EToolModules } from '../../_dto/enums';
/**
 * 从task detail中获取case information
 */
export default function* submitUpdateDocument(_: any, { call, put, select }: any) {
  let documentEdit = yield select(({ documentManagement }: any) => documentManagement.documentEdit);

  documentEdit = formUtils.cleanValidateData(documentEdit);

  const response = yield call(updateDocInfo, [documentEdit]);

  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put({
      type: 'updateDocuments',
      payload: { documents: documentEdit, allUpdate: true },
    });
    yield put({
      type: 'selectToolItem',
      payload: { toolId: EToolModules.edit },
    });
    notification.success({
      message: formatMessageApi({ Label_COM_WarningMessage: 'NTF_000045' }),
    });
  } else {
    notification.error(formatMessageApi({ Label_COM_WarningMessage: 'NTF_000047' }));
  }
}
