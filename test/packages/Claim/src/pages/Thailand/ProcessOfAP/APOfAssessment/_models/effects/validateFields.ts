import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { collectSectionErrors } from '../../validators';
import { SS, SSKey } from '@/utils/cache';

export default function* validateFields(action, { select, put }: any) {
  const skipValidateFormIds = action?.payload?.skipValidateFormIds || [];
  const onlyRequired = action?.payload?.onlyRequired || false;
  const taskSkipVaildate = SS.getItem(SSKey.TASKSKIPVAILDATE);
  if (!!taskSkipVaildate) {
    return [];
  }
  yield put({
    type: 'formCommonController/handleValidating',
  });
  const forms = yield select((state) => state.formCommonController.forms);
  let lastValidateForms = forms;
  if (!lodash.isEmpty(skipValidateFormIds)) {
    // eg：
    // {
    //   "aaa_1": { data: "A1" },
    //   "bbb-2": { data: "B2" },
    //   "ccc_3": { data: "C3" }
    // }
    // ["aaa_", "bbb-"]
    // 输出: { "ccc_3": xxx }
    lastValidateForms = Object.fromEntries(
      Object.entries(forms).filter(
        ([key]) => !skipValidateFormIds.some((prefix) => key.startsWith(prefix))
      )
    );
  }

  let errors = [];
  if (onlyRequired) {
    errors = yield formUtils.validateFormsAndGetErrorsByRequired({
      forms: lodash.values(lastValidateForms),
      force: true,
    });
  } else {
    errors = yield formUtils.validateFormsAndGetErrors({
      forms: lodash.values(lastValidateForms),
      force: true,
    });
  }

  const claimProcessData = yield select(
    (state) => state.apOfClaimAssessmentController.claimProcessData
  );
  const claimEntities = yield select((state) => state.apOfClaimAssessmentController.claimEntities);
  const submited = yield select((state) => state.formCommonController.submited);
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
