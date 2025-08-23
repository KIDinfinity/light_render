import { produce }  from 'immer';
import lodash from 'lodash';
import { getBenefitKeys } from '../functions/utils';

import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const handleDelete = ({ Ids, draftState, benefitCategory, dex = 0, saveId }: any) => {
  const { mapKey, listKey } = getBenefitKeys(benefitCategory, dex);

  if (benefitCategory === eBenefitCategory.Life) {
    draftState.claimEntities.claimPayableListMap = lodash.omit(
      draftState.claimEntities.claimPayableListMap,
      lodash.filter(Ids, (item) => item !== saveId)
    );
  } else {
    const children = lodash
      .chain(Ids)
      .compact()
      .map((id) => draftState.claimEntities?.[mapKey]?.[id]?.[listKey] || [])
      .flatten()
      .value();

    draftState.claimEntities[mapKey] = lodash.omit(
      draftState.claimEntities?.[mapKey],
      lodash.filter(Ids, (item) => item !== saveId)
    );

    if (saveId) {
      draftState.claimEntities[mapKey][saveId][listKey] = [];
    }

    if (lodash.size(children) > 0) {
      handleDelete({ Ids: children, draftState, benefitCategory, dex: dex + 1 });
    }
  }
};

const payableSeriesDelete = (state: any, { payload }: any) => {
  const { benefitCategory, deleteId, saveId } = payload;

  const nextState = produce(state, (draftState: any) => {
    handleDelete({ Ids: deleteId, draftState, benefitCategory, saveId });
    draftState.claimProcessData.claimPayableList = lodash.map(
      draftState?.claimEntities?.claimPayableListMap,
      (item) => item?.id
    );
  });
  return { ...nextState };
};

export default payableSeriesDelete;
