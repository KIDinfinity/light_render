import lodash from 'lodash';
import { downloadDoc } from '@/services/docManagementControllerService';
import Base64Down from '../../_functions/base64Down';
import handleMessageModal from '@/utils/commonMessage';

export default function* downloadFile({ payload }: any, { call }: any) {
  const { data } = payload;
  const response = yield call(downloadDoc, {
    imageId: data.image,
    mimeType: data.mimeType,
    name: data.name,
  });

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const documentName = response.resultData?.documentName || '';
    const mimeType = response.resultData?.mimeType || '';

    yield Base64Down.init(`data:${mimeType}};base64,${response.resultData.base64}`, documentName);
  } else {
    handleMessageModal(response?.promptMessages);
  }
}
