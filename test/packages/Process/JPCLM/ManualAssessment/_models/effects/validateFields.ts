import lodash from 'lodash';
import { formUtils, Validator } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { collectSectionErrors, validatePolicyAgent } from 'claimBasicProduct/pages/validators';

export default function* validateFields(_, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state: any) => state.formCommonController.forms);

  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  const claimProcessData = yield select(
    (state: any) => state.JPCLMOfClaimAssessment.claimProcessData
  );
  const draftState = yield select((state: any) => state.JPCLMOfClaimAssessment);
  const claimEntities = yield select((state: any) => state.JPCLMOfClaimAssessment.claimEntities);
  const submited = yield select((state: any) => state.formCommonController.submited);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const sectionErrors = collectSectionErrors(content, submited);
  const policyAgentErrors = validatePolicyAgent(content);
  const radioTherapyReasonDateGroupErrors = Validator.VLD_000698(draftState);

  if (
    (lodash.isArray(sectionErrors) && sectionErrors.length > 0) ||
    (lodash.isArray(radioTherapyReasonDateGroupErrors) &&
      radioTherapyReasonDateGroupErrors.length > 0) ||
    (lodash.isArray(policyAgentErrors) && policyAgentErrors.length > 0)
  ) {
    errors = [
      ...errors,
      ...sectionErrors,
      ...policyAgentErrors,
      ...radioTherapyReasonDateGroupErrors,
    ];
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
