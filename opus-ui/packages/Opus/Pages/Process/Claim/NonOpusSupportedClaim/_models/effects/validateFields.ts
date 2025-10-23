import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { validatePolicyAgent } from 'claimBasicProduct/pages/validators';

export default function* validateFields(_, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state: any) => state.formCommonController.forms);

  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  const businessData = yield select((state: any) => state.opusNonOpusClaimManagement.businessData);

  const submited = yield select((state: any) => state.formCommonController.submited);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(businessData));
  // const sectionErrors = collectSectionErrors(content, submited);
  const policyAgentErrors = validatePolicyAgent(content);

  if (
    // (lodash.isArray(sectionErrors) && sectionErrors.length > 0) ||
    lodash.isArray(policyAgentErrors) &&
    policyAgentErrors.length > 0
  ) {
    errors = [
      ...errors,
      // ...sectionErrors,
      ...policyAgentErrors,
    ];
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
