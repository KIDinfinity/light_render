import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';

export default function* validateFields(_, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state) => state.formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const claimProcessData = yield select(
    (state) => state.bpOfDataCaptureController.claimProcessData
  );
  const claimEntities = yield select((state) => state.bpOfDataCaptureController.claimEntities);
  const submited = yield select((state) => state.formCommonController.submited);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const sectionErrors = collectSectionErrors(content, submited);

  if (lodash.isArray(sectionErrors) && sectionErrors.length > 0) {
    errors = [...errors, ...sectionErrors];
  }
  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
