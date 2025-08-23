import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_: any, { select }: any) {
  const forms = yield select((state: any) => state.formCommonController.forms);
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash
      .chain(forms)
      .keys()
      .filter((el) => el?.indexOf('FormData') !== -1)
      .map((el) => forms[el])
      .value(),
    force: true,
  });

  return errors;
}
