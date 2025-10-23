import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { collectSectionErrors } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfClaimRegistration/validators';

export default function* validateFields(_, { select }: any) {
  const forms = yield select((state) => state.formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const { claimProcessData, claimEntities } = yield select(
    (state) => state.JPCLMOfClaimRegistrationController
  );
  const submited = yield select((state) => state.formCommonController.submited);

  const sectionErrors = yield collectSectionErrors(claimProcessData, claimEntities, submited);

  if (lodash.isArray(sectionErrors) && sectionErrors.length > 0) {
    errors = [...errors, ...sectionErrors];
  }
  return errors;
}
