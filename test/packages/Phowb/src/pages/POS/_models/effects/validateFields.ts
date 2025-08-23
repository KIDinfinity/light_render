import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import sectionError from '../../validators/sectionError';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleSubmited',
  });
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const { forms, claimProcessData, taskDefKey } = yield select((state: any) => ({
    claimProcessData: state.phowbDataCaptureController.claimProcessData,
    taskDefKey: state.processTask.getTask?.taskDefKey,
    forms: state.formCommonController.forms,
  }));

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return [...errors, ...sectionError({ claimProcessData, taskDefKey })];
}
