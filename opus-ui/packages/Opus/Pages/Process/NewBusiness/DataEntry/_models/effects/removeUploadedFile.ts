import lodash from 'lodash';
import request from '@/utils/request';
import type { UploadFileModel } from 'packages/Opus/Modules/Document/_dto/model';

async function deleteFileList(params?: any, option?: any): Promise<any> {
  return request('/api/integration/submission/deleteFileList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default function* removeUploadedFile({ payload }: any, { call, put }: any) {
  const { uploadFiles } = payload;
  const docDataId = lodash.compact(
    lodash.map(uploadFiles, (file: UploadFileModel) => file?.docDataId)
  );

  if (!lodash.isEmpty(docDataId)) {
    yield call(deleteFileList, docDataId);
  }

  yield put({
    type: 'removeUploadFile',
    payload: lodash.map(uploadFiles, (file: UploadFileModel) => file?.fileId),
  });
}
