import lodash from 'lodash';
import { deleteFileList } from '@/services/docManagementControllerService';
import { EToolModules } from '../../_dto/enums';
import type { StateModel, UploadFileModel } from '../../_dto/model';

/**
 * 从task detail中获取case information
 */
export default function* removeUploadedFile({ payload }: any, { call, put, select }: any) {
  const { uploadFiles, all } = payload;
  const images = lodash.compact(lodash.map(uploadFiles, (file: UploadFileModel) => file?.image));

  if (!lodash.isEmpty(images)) {
    yield call(deleteFileList, images);
  }

  yield put({
    type: 'removeUploadFile',
    payload: all ? null : lodash.map(uploadFiles, (file: UploadFileModel) => file?.fileId),
  });

  const { uploadFiles: files }: StateModel = yield select(({ documentManagement }: any) => ({
    uploadFiles: documentManagement.uploadFiles,
  }));

  if (all || !files?.length) {
    yield put({
      type: 'selectToolItem',
      payload: { toolId: EToolModules.upload },
    });
  }
}
