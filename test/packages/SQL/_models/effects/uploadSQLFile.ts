import { upload, exists } from '@/services/ccPatchControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call }: any): any {
  const { file, checksum } = payload;
  const isExists = yield call(exists, { checksum });

  if (isExists?.resultData) {
    return 'exist';
  }

  const response: any = yield call(
    upload,
    objectToFormData({
      file,
      checksum,
    })
  );

  return response && response.success;
}
