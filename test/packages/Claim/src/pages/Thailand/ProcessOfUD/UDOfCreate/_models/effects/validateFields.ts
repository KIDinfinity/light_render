import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* validateFields(_: any, { select }: any) {
  const { forms = {} } = yield select((state: any) => ({
    forms: state.formCommonController.forms,
  }));

  return yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  } as any);
}
