import { v4 as uuidv4 } from 'uuid';
import { limitFileSize } from 'documentManage/pages/ToolsGroup/Upload/configs';
import { EErrorResCodes } from 'documentManage/pages/_dto/enums';

export default function* ({ payload }: any, { put }: any) {
  const { files } = payload;
  const fileList: any[] = [];

  files.forEach((item: any) => {
    const id = uuidv4();
    fileList.push({
      fileId: id,
      id,
      name: item.name,
      file: item,
      image: item.size <= limitFileSize ? '' : EErrorResCodes.uploadFailed,
      receivedDate: new Date(),
    });
  });
  yield put({
    type: 'documentManagement/saveUploadFiles',
    payload: { files: fileList },
  });
}
