import lodash from 'lodash';
import { notification } from 'antd';
import { ByClaimNoAndDocId } from '@/services/docManagementControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* submitVoid({ payload }: any, { put, call }: any) {
  const response = yield call(ByClaimNoAndDocId, objectToFormData(payload));
  const { success } = lodash.pick(response, ['success']);
  if (success) {
    notification.success({
      message: formatMessageApi({ Label_COM_WarningMessage: 'NTF_000045' }),
    });
    yield put({
      type: 'updateDocuments',
      payload: {
        documents: payload,
      },
    });
  } else {
    notification.error(formatMessageApi({ Label_COM_WarningMessage: 'NTF_000047' }));
  }
}
