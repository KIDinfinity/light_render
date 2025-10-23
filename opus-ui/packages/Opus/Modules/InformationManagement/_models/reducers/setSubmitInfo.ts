import lodash from 'lodash';
import { produce } from 'immer';
import { LinkTo } from '../../enum';

export default (state: any, action: Object) => {
  const data = lodash.get(action, 'payload', {});
  const [[key, val]] = lodash.toPairs(data);
  const nextState = produce(state, (draftState: any) => {
    const { informationGroups, curGroupCode, classification } = lodash.pick(state, [
      'informationGroups',
      'curGroupCode',
      'classification',
    ]);
    const caseCategorylist = lodash.get(
      informationGroups,
      `${curGroupCode}.selectCaseCategorylist`,
      []
    );

    const obj: any = {
      ...data,
    };

    if (key === 'infoCategoryCode') {
      const infoCategoryLinkTo =
        (caseCategorylist.find((i) => i.infoCategoryCode === val) || {})
          .infoCategoryDefaultLinkTo || 'case';

      obj.infoCategoryLinkTo = infoCategoryLinkTo;
    }

    const policyIdList = lodash.get(classification, 'policyIdList', []);
    if (
      ((key === 'infoCategoryLinkTo' && val === LinkTo.policy) ||
        obj.infoCategoryLinkTo === LinkTo.policy) &&
      policyIdList?.length == 1
    ) {
      obj.policyIds = policyIdList;
    }

    draftState.submitInfo[curGroupCode] = {
      ...(draftState.submitInfo[curGroupCode] || {}),
      ...obj,
    };
  });

  return {
    ...nextState,
  };
};
