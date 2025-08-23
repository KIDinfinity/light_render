import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getSectionError } from 'phowb/utils/validate';

export default function* (action: any, { select }) {
  const { forms, selectedTransactionTypes } = yield select((state: any) => ({
    forms: state.formCommonController.forms,
    selectedTransactionTypes: state?.batchCreateProcess?.selectedTransactionTypes,
  }));
  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  });
  const sectionErrors = getSectionError({
    selectedTransactionTypes,
  });
  return lodash.merge(errors, sectionErrors);
}
