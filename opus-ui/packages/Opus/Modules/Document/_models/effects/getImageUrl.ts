import lodash from 'lodash';
import { downloadDoc } from '@/services/docManagementControllerService';
import Base64Down from '../../_functions/base64Down';

export default function* getImageUrl(_: any, { call, select }: any) {
  const fileObject = yield select((state: any) => state.documentManagement.fileObject);
  const response = yield call(downloadDoc, {
    imageId: fileObject?.imageId,
    mimeType: fileObject?.mimeType,
    name: fileObject?.name,
  });

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const documentName = response.resultData?.documentName || '';

    Base64Down.init(
      `data:${fileObject?.mimeType};base64,${response.resultData.base64}`,
      documentName
    );
  }
}
