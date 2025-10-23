import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { createNormalizeData } from '@/utils/claimUtils';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

export default function* validateFields(_, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state: any) => state.formCommonController.forms);

  const newForms = lodash.omitBy(forms, (item, key) => {
    return !lodash.includes(key, 'paymentAllocation');
  });

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(newForms),
    force: true,
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  if (!lodash.isEmpty(errors)) {
    return;
  }

  const { datas: claimData, wholeEntities }: any = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal
  ) || {};
  const cleanedClaimData = formUtils.cleanValidateData(claimData);
  const { claimEntities, claimProcessData } = createNormalizeData(cleanedClaimData, wholeEntities);

  yield put({
    type: `paymentUpdateData`,
    payload: {
      claimEntities,
      claimProcessData,
    },
  });

  yield put({
    type: `paymentHiddenModal`,
  });
}
