import lodash from 'lodash';
import { produce } from 'immer';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { mapForHandle } from 'process/Utils/benefitCategoryUtils';

const lastDexKey = {
  [eBenefitCategory.Reimbursement]: 2,
  [eBenefitCategory.Aipa]: 1,
  [eBenefitCategory.Cashless]: 0,
  default: 0,
};

const handleDelete = ({ draftState, id, benefitCategory, dex = 0, lastDex }: any) => {
  const maxDex = mapForHandle?.[benefitCategory]?.length - 1;
  const curLastDex = lastDex || lastDexKey?.[benefitCategory] || lastDexKey.default;
  const endDex = curLastDex > maxDex ? maxDex : curLastDex;
  const mapKey = mapForHandle?.[benefitCategory]?.[dex]?.mapKey;
  const listKey = mapForHandle?.[benefitCategory]?.[dex]?.listKey;
  const parentKey = mapForHandle?.[benefitCategory]?.[dex]?.parentKey;
  const parentIdKey = mapForHandle?.[benefitCategory]?.[dex]?.parentIdKey;
  const parentId = draftState.claimEntities?.[mapKey]?.[id]?.[parentIdKey];
  delete draftState.claimEntities?.[mapKey][id];
  if (parentId) {
    const relationship = lodash.filter(
      draftState.claimEntities?.[parentKey]?.[parentId]?.[listKey],
      (item) => item !== id
    );
    draftState.claimEntities[parentKey][parentId][listKey] = relationship;
    if (lodash.size(relationship) === 0) {
      if (dex === endDex) {
        draftState.claimEntities[parentKey][parentId].claimDecision = 'D';
      } else {
        handleDelete({ draftState, id: parentId, benefitCategory, dex: dex + 1, lastDex });
      }
    }
  }
};

const benefitItemGroupDelete = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState) => {
    const { groupBy, benefitCategory, boosterDate } = payload;
    const deleteIdList = lodash.map(groupBy, (item) => item?.id);
    const boosterIds = lodash.isArray(boosterDate)
      ? lodash.map(boosterDate, (item) => item?.id)
      : boosterDate?.id;
    lodash.map(deleteIdList, (id) => handleDelete({ draftState, id, benefitCategory }));
    lodash.map(boosterIds, (id) =>
      handleDelete({
        draftState,
        id,
        benefitCategory,
        lastDex: lodash.size(mapForHandle?.[benefitCategory]),
      })
    );

    draftState.claimProcessData.claimPayableList = lodash.map(
      draftState.claimEntities.claimPayableListMap,
      (item) => item?.id
    );
  });
  return { ...nextState };
};

export default benefitItemGroupDelete;
