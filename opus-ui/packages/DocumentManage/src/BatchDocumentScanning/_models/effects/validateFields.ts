import lodash, { values, isEmpty, forEach } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { EErrorResCodes } from 'documentManage/pages/_dto/enums';
import get from 'lodash/get';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const { type, forms, claimProcessData } = yield select(
    ({ formCommonController, batchDocumentScanningController }) => ({
      forms: formCommonController.forms,
      claimProcessData: batchDocumentScanningController?.claimProcessData,
      type: batchDocumentScanningController.type,
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
  if (isEmpty(type)) {
    errors.push({ message: 'required' });
  }

  forEach(claimProcessData, (data) => {
    const uploadFiles = get(data, 'uploadFiles', []);
    uploadError.push(
      ...uploadFiles?.filter((item: any) => item?.image === EErrorResCodes.uploadFailed)
    );
    if (isEmpty(uploadFiles) || uploadFiles.some((file) => isEmpty(file?.fileId))) {
      fileError.push({ message: 'required' });
    }
  });

  yield put.resolve({
    type: 'formCommonController/handleUnValidating',
  });

  return [...errors, ...uploadError, ...fileError];
}
