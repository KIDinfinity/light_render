import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { validateResume } from 'claim/pages/Thailand/ProcessOfUD/UnknownDocument/validation';

export default function* validateFields(_: any, { select }: any) {
  const { forms = {}, claimProcessData, claimHistorySearchResultRowKeys } = yield select(
    (state: any) => ({
      forms: state.formCommonController.forms,
      ...lodash.pick(state.UnknownDocumentController, [
        'claimHistorySearchResultRowKeys',
        'claimProcessData',
      ]),
    })
  );
  const { decision } = claimProcessData;

  const errors = yield formUtils.validateFormsAndGetErrors({
    forms: lodash.values(forms),
    force: true,
  } as any);
  if (validateResume(decision, claimHistorySearchResultRowKeys)) {
    errors.push({});
  }
  return errors;
}
