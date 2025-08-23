import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(
  { data, isRaneTotalFundAllocation, index }: any,
  { select, put }: any
) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select(({ formCommonController }: any) => formCommonController.forms);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  if (data && data?.length && !isRaneTotalFundAllocation && index === 2) {
    errors.push('');
    yield put({
      type: 'manualUnderwriting/addFundTotalError',
      payload: {
        totalError: true,
      },
    });
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
