import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (action: any, { select }: any) {
  const forms = yield select((state: any) => state.caseSplitController.forms);

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  } as any);

  return errors;
}
