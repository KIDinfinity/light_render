import { produce } from 'immer';
import lodash from 'lodash';
import { mapForHandle } from 'process/Utils/benefitCategoryUtils';

const handleDelete = ({ Ids, draftState, benefitCategory, dex = 0, isDel }: any) => {
  const mapKey =
    mapForHandle?.[benefitCategory]?.[dex]?.mapKey || mapForHandle.default?.[dex]?.mapKey;
  const listKey = mapForHandle?.[benefitCategory]?.[dex]?.listKey;
  const children = lodash
    .chain(Ids)
    .map((id) => draftState.claimEntities?.[mapKey]?.[id]?.[listKey] || [])
    .flatten()
    .value();
  if (isDel || dex !== 0) {
    draftState.claimEntities[mapKey] = lodash.omit(draftState.claimEntities?.[mapKey], Ids);
  } else {
    lodash.forEach(Ids, (id) => {
      draftState.claimEntities[mapKey][id].treatmentPayableList = [];
    });
  }
  if (lodash.size(children) > 0) {
    handleDelete({ Ids: children, draftState, benefitCategory, dex: dex + 1 });
  }
};

const benefitTypeGroupDelete = (state: any, { payload }: any) => {
  const { groupBy, boosters, benefitCategory, isDel } = payload;
  const nextState = produce(state, (draftState: any) => {
    const claimPayableIds = lodash.map(groupBy, (item) => item?.id);
    const boosterClaimPayableIds = lodash
      .chain(boosters)
      .map((item) => item?.payableId)
      .uniq()
      .value();
    handleDelete({ Ids: claimPayableIds, draftState, benefitCategory, isDel });

    if (lodash.size(boosterClaimPayableIds) > 0) {
      handleDelete({ Ids: boosterClaimPayableIds, draftState, benefitCategory, isDel });
    }
    draftState.claimProcessData.claimPayableList = lodash.filter(
      draftState?.claimProcessData?.claimPayableList,
      (id) => !lodash.includes([...(isDel ? claimPayableIds : []), ...boosterClaimPayableIds], id)
    );
  });
  return { ...nextState };
};

export default benefitTypeGroupDelete;
