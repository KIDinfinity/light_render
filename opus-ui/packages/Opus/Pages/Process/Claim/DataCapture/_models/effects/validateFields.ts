import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { collectSectionErrors, validatePolicyAgent } from 'claimBasicProduct/pages/validators';

export default function* validateFields(_, { select, put }: any) {
  const forms = yield select((state) => state.formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const claimProcessData = yield select((state) => state.opusClaimDataCapture.claimProcessData);
  const claimEntities = yield select((state) => state.opusClaimDataCapture.claimEntities);
  const submited = yield select((state) => state.formCommonController.submited);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const sectionErrors = collectSectionErrors(content, submited);
  const policyAgentErrors = validatePolicyAgent(content);
  if (
    (lodash.isArray(sectionErrors) && sectionErrors.length > 0) ||
    (lodash.isArray(policyAgentErrors) && policyAgentErrors.length > 0)
  ) {
    errors = [...errors, ...sectionErrors, ...policyAgentErrors];
  }

  return errors;
}
