import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { sectionErrors } from '../../validators';

export default function* validateFields(_, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select(({ formCommonController }: any) => formCommonController.forms);
  let errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });

  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const submited = yield select(({ formCommonController }: any) => formCommonController.submited);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const collectSectionErrors = sectionErrors(content, submited, claimEntities);

  if (lodash.isArray(collectSectionErrors) && collectSectionErrors.length > 0) {
    errors = [...errors, ...collectSectionErrors];
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
