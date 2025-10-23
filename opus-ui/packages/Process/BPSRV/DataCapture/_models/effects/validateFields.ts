import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { sectionErrors } from '../../validators';
import { NAMESPACE } from '../../activity.config';

export default function* validateFields(_: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });

  const forms: Object[] = yield select(
    ({ formCommonController }: any) => formCommonController.forms
  );
  const submited: boolean = yield select(
    ({ formCommonController }: any) => formCommonController.submited
  );
  const processData: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const claimEntities: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  let errors: Object[] = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(processData));
  const collectSectionErrors = sectionErrors(content, submited, claimEntities);
  if (lodash.isArray(collectSectionErrors) && collectSectionErrors.length > 0) {
    errors = [...errors, ...collectSectionErrors];
  }

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
