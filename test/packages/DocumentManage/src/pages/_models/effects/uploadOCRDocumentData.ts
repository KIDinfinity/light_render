import { ocrDocumentData } from '@/services/docManagementControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { handleMessageModal } from '@/utils/commonMessage';
import lodash from 'lodash';

export default function* uploadOCRDocumentData({ payload }: any, { call }: any) {
  const { caseNo, claimNo, fileId, file } = payload;
  const response = yield call(
    ocrDocumentData,
    objectToFormData({
      caseNo,
      claimNo,
      fileId,
      file,
    })
  );
  if (!response.success) {
    if (lodash.get(response, 'resultData[x-error-nonce]') !== 'x-error-nonce') {
      handleMessageModal(response?.promptMessages);
    }
  }
  return response;
}
