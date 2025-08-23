import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '../functions/normalizeFunc';
import { collectSectionErrorsOfJPCA } from '@/utils/validationsOfProcess';

export default function* validateFieldsAsync({ payload }: any, { select, put, take }: any) {
  yield take('saveEntryEnd/@@end');

  let { errors } = payload;

  const claimProcessData = yield select(
    (state: any) => state.JPCLMOfClaimAssessmentController.claimProcessData
  );
  const claimEntities = yield select(
    (state: any) => state.JPCLMOfClaimAssessmentController.claimEntities
  );
  const submited = yield select((state: any) => state.formCommonController.submited);
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const sectionErrors = collectSectionErrorsOfJPCA(content, submited);

  if (lodash.isArray(sectionErrors) && sectionErrors.length > 0) {
    errors = [...errors, ...sectionErrors];
  }
  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
