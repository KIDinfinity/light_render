import { values, isEmpty } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { EErrorResCodes } from 'documentManage/pages/_dto/enums';

export default function* validateFields(_: any, { select, put, take }: any) {
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const { forms, uploadFiles, claimProcessData } = yield select((state: any) => ({
    forms: state.formCommonController.forms,
    uploadFiles: state.documentManagement.uploadFiles,
    claimProcessData: state.documentScanningController?.claimProcessData,
  }));
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: values(forms),
    force: true,
  });

  if (isEmpty(claimProcessData?.type)) {
    errors.push({ message: 'required' });
  }

  const uploadError = uploadFiles?.filter(
    (item: any) => item?.image === EErrorResCodes.uploadFailed
  );

  const fileError = isEmpty(uploadFiles) ? [{ message: 'required' }] : [];

  yield put.resolve({
    type: 'formCommonController/handleUnValidating',
  });

  return [...errors, ...uploadError, ...fileError];
}
