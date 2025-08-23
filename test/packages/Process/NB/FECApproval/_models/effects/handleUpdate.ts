import lodash from 'lodash';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { updateFecDetail } from '@/services/owbRegistrationVanillaControllerService';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import { notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* handleUpdate(_: any, { select, put, call }: any) {
  const forms = yield select(({ formCommonController }) => formCommonController?.forms);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash
      .values(forms)
      .filter((item) => lodash.has(item, 'section'))
      .map((item) => item.form),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  if (lodash.size(errors) > 0) {
    return;
  }

  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });

  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);

  const param = getSubmitData({
    taskDetail,
    dataForSubmit,
  });

  const response = yield call(updateFecDetail, param);

  if (response.success) {
    yield put({
      type: 'saveBizData',
      payload: {
        businessData: response.resultData,
      },
    });
    notification.success({
      message: formatMessageApi({
        Label_COM_Message: 'MSG_000964',
      }),
    });
  }
  if (!response?.success) {
    handleErrorMessageIgnoreXErrorNotice(response);
  }
}
