import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { collectSectionErrors } from '../../validators';

export default function* validateFields(_, { select }: any) {
  const forms = yield select((state) => state.formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  const claimProcessData = yield select(
    (state) => state.hbOfClaimAssessmentController.claimProcessData
  );
  const claimEntities = yield select((state) => state.hbOfClaimAssessmentController.claimEntities);
  const submited = yield select((state) => state.formCommonController.submited);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));
  const entities = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimEntities));
  const sectionErrors = collectSectionErrors(content, submited, entities);

  if (lodash.isArray(sectionErrors) && sectionErrors.length > 0) {
    errors = [...errors, ...sectionErrors];
  }
  return errors;
}
