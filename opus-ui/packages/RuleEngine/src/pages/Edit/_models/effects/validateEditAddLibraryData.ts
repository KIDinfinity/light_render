import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateEditAddLibraryData(action: any, { select }: any) {
  const { validateKey } = action.payload;
  const forms = yield select((state: any) => state.formCommonController.forms);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash
      .chain(forms)
      .keys()
      .filter((el) => el?.indexOf(validateKey) !== -1 && forms[el].getFieldsValue().checked)
      .map((el) => forms[el])
      .value(),
    force: true,
  });

  return errors;
}
