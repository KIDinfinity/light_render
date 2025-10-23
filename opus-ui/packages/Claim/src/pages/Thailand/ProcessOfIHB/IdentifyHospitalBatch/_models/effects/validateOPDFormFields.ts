import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateOPDFormFields(_: any, { select }: any) {
  const forms = yield select(
    (state: any) => state.IdentifyHospitalBatchController.claimProcessData.forms
  );
  const formsKeyArr = lodash.keys(forms);
  const hasErrFormIdxArr = [];
  for (let i = 0, len = formsKeyArr.length; i < len; i += 1) {
    const errors = yield formUtils.validateFormsAndGetErrors({
      forms: [forms[formsKeyArr[i]]],
      force: true,
    });
    if (errors.length) {
      const formIdx = formsKeyArr[i].split('_')[1];
      if (!lodash.isUndefined(formIdx)) {
        hasErrFormIdxArr.push(formIdx);
      }
    }
  }
  return lodash.uniq(hasErrFormIdxArr);
}
