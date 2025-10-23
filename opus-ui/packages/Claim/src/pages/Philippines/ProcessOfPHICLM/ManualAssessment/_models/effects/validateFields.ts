import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { collectSectionErrors } from '../../validators';

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
    (state) => state.PHCLMOfClaimAssessmentController.claimProcessData
  );
  const claimEntities = yield select(
    (state) => state.PHCLMOfClaimAssessmentController.claimEntities
  );
  const submited = yield select((state) => state.formCommonController.submited);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const entities = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimEntities));
  const sectionErrors = collectSectionErrors(content, submited, entities);

  if (lodash.isArray(sectionErrors) && sectionErrors.length > 0) {
    errors = [...errors, ...sectionErrors];
  }
  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
