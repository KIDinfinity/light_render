import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { collectSectionErrors } from '../../validators';

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
    (state: any) => state.apOfClaimCaseController.claimProcessData
  );
  const claimEntities = yield select((state: any) => state.apOfClaimCaseController.claimEntities);
  const submited = yield select((state: any) => state.formCommonController.submited);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));
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
