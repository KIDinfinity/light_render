import lodash from 'lodash';
import { deleteFileList } from '@/services/docManagementControllerService';
import type { UploadFileModel } from '../../_dto/model';

/**
 * 从task detail中获取case information
 */
export default function* removeUploadedFile({ payload }: any, { call, put }: any) {
  const { uploadFiles } = payload;
  const images = lodash.compact(lodash.map(uploadFiles, (file: UploadFileModel) => file?.image));

  if (!lodash.isEmpty(images)) {
    yield call(deleteFileList, images);
  }

  yield put({
    type: 'removeUploadFile',
    payload: lodash.map(uploadFiles, (file: UploadFileModel) => file?.fileId),
  });
}
