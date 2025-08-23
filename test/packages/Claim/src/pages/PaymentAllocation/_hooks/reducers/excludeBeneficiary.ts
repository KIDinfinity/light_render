import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { ActionModel } from '../actions/ActionModel';

export default (state: any, { payload }: ActionModel) => {
  const { clientId, beneficiaryItem } = payload || {};

  return produce(state, (draftSate: any) => {
    const draft = draftSate;
    let { excludedbeneficiaries } = draft;
    if (lodash.isEmpty(excludedbeneficiaries) || !lodash.isArray(excludedbeneficiaries)) {
      excludedbeneficiaries = [];
    }

    const payTo = formUtils.queryValue(beneficiaryItem?.payTo);

    const beneficiaryO = {
      clientId: formUtils.queryValue(beneficiaryItem?.clientId),
      payTo,
      beneficiaryId: beneficiaryItem?.id,
    };

    const beneficiaryN = {
      clientId: formUtils.queryValue(clientId),
      payTo,
      beneficiaryId: beneficiaryItem?.id,
    };

    let excludedbeneficiariesTemp: any = [];

    if (!formUtils.queryValue(clientId)) {
      excludedbeneficiariesTemp = lodash
        .chain(excludedbeneficiaries)
        .cloneDeep()
        .differenceWith([beneficiaryO], lodash.isEqual)
        .value();
    } else {
      excludedbeneficiariesTemp = lodash
        .chain(excludedbeneficiaries)
        .cloneDeep()
        .concat(beneficiaryN)
        .uniqWith(
          (prev: any, next: any) =>
            prev.beneficiaryId === next.beneficiaryId &&
            prev.payTo === next.payTo &&
            prev.clientId === next.clientId
        )
        .compact()
        .value();
    }

    draft.excludedbeneficiaries = excludedbeneficiariesTemp;
  });
};
