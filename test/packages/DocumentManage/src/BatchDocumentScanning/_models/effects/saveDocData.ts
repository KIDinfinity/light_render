import { saveDocData } from '@/services/integrationSubmissionControllerService';
import { getBase64 } from 'documentManage/DocumentScanning/utils';
import { v4 as uuid }  from 'uuid';
import { limitFileSize } from 'documentManage/pages/ToolsGroup/Upload/configs';
import { EErrorResCodes } from 'documentManage/pages/_dto/enums';
import { documentInfoInit } from 'documentManage/pages/_models/state/index';
import { ButtonCode } from 'bpm/pages/OWBEntrance/constants';

export default function* ({ payload }: any, { call, put }: any) {
  const { sectionIndex, files, contextDispatch } = payload;
  if (!files || !files.length) {
    return;
  }
  const uploadFiles = [];
  for (const file of files) {
    const id = uuid();
    const { name, size } = file;
    uploadFiles.push({
      ...documentInfoInit,
      fileId: '',
      id,
      name,
      file,
      image: size <= limitFileSize ? '' : EErrorResCodes.uploadFailed,
      receivedDate: new Date(),
    });
  }
  yield put({
    type: 'saveUploadFiles',
    payload: { sectionIndex, uploadFiles },
  });

  yield call(contextDispatch, {
    type: 'setButtonStatus',
    payload: { buttonCode: ButtonCode.Submit, status: 'loading' },
  });
  for (const file of uploadFiles) {
    const base64 = yield getBase64(file.file);
    const res = yield call(saveDocData, { fileImageData: base64 });
    if (res?.success) {
      yield put({
        type: 'updateFileId',
        payload: { sectionIndex, id: file.id, fileId: res?.resultData },
      });
    } else {
      yield put({
        type: 'updateFileId',
        payload: {
          sectionIndex,
          id: file.id,
          fileId: res?.resultData,
          image: EErrorResCodes.uploadFailed,
        },
      });
    }
  }
  yield call(contextDispatch, {
    type: 'setButtonStatus',
    payload: { buttonCode: ButtonCode.Submit, status: 'default' },
  });
}
