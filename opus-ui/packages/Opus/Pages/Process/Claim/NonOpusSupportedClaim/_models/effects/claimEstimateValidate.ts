import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* claimEstimateValidate(_: any, { select }: any) {
  const forms = yield select(({ formCommonController }: any) => formCommonController?.forms) || {};

  let errors = yield formUtils.validateFormsAndGetErrors({
    forms:
      lodash
        .chain(lodash.keys(forms))
        .filter((key: any) => lodash.includes(key, 'ClaimEstimation'))
        .map((key) => forms[key])
        .value() || {},
    force: true,
  });

  return errors || [];
}
