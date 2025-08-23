import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(action: any, { select, put, take }: any) {
  const { claimData, forms } = yield select((state: any) => ({
    ...state.paymentAllocation,
  }));
  const controllerForms = yield select(
    ({ formCommonController }: any) => formCommonController.forms
  );

  if (claimData?.claimDecision?.assessmentDecision === 'D')
    return {
      errors: [],
    };
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const formDatas: any[] = lodash.values(
    action?.payload?.useControllerForm ? controllerForms : forms
  );
  let errors: any[] = [];

  if (formDatas.length > 0) {
    errors = yield formUtils.validateFormsAndGetErrorsAsync({ forms: formDatas, force: true });
    yield take('saveEntryEnd/@@end');
  }

  yield put({
    type: 'paymenSaveErrors',
    payload: {
      errors,
    },
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return { errors };
}
