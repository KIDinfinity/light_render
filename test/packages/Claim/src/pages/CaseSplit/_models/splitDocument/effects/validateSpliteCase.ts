// import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const FORMID_PRFIX = 'Split_By_Doc';

export default function* (action: any, { select }: any) {
  const splitByDocform = yield select(
    (state: any) => state.caseSplitController.forms[FORMID_PRFIX]
  );

  const errors = yield formUtils.validateFormsAndGetErrors({
    // forms: lodash.values(forms),
    forms: [splitByDocform],
    force: true,
  } as any);

  return errors;
}
