import lodash, { values, isEmpty, forEach, get } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { EErrorResCodes } from 'documentManage/pages/_dto/enums';
export default function* validateFields(_, { select, put }: any): Generator<any, any, any> {
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const { forms, claimProcessData } = yield select(
    ({ formCommonController, opusDocumentScanning }) => ({
      forms: formCommonController.forms,
      claimProcessData: opusDocumentScanning?.businessData?.claimProcessData,
    })
  );
  const errors = [];
  const formArr = values(forms);
  for (let i = 0; i < formArr.length; i += 3) {
    const sliceForms = lodash.slice(formArr, i, i + 3);
    const formErr = yield formUtils.validateFormsAndGetErrors({
      forms: sliceForms,
      force: true,
    });
    errors.push(...formErr);
  }
  const uploadError = [];
  const fileError = [];
  forEach(claimProcessData, (data) => {
    const uploadFiles = get(data, 'uploadFiles', []);
    uploadError.push(
      ...uploadFiles?.filter((item: any) => item?.image === EErrorResCodes.uploadFailed)
    );
    if (isEmpty(uploadFiles) || uploadFiles.some((file) => isEmpty(file?.documentFileId))) {
      fileError.push({ message: 'required' });
    }
  });
  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return [...errors, ...uploadError, ...fileError];
}
