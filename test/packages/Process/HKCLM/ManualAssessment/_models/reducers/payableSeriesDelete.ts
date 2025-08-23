import { produce }  from 'immer';
import lodash from 'lodash';
import { updateClaimPolicyPayableFun, getRemoveClaimPolicyPayable } from '../functions';
import { HKDoop } from '../functions';

const handleDelete = ({ Ids, draftState, benefitCategory, dex = 0, saveId }: any) => {
  const mapKey = HKDoop?.[benefitCategory]?.[dex]?.mapKey || HKDoop.default?.[dex]?.mapKey;
  const listKey = HKDoop?.[benefitCategory]?.[dex]?.listKey;
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
};

const payableSeriesDelete = (state: any, { payload }: any) => {
  const { benefitCategory, deleteId, saveId } = payload;

  const nextState = produce(state, (draftState: any) => {
    const basicClaimPayable = draftState?.claimEntities?.claimPayableListMap[deleteId[0]];

    handleDelete({ Ids: deleteId, draftState, benefitCategory, saveId });

    draftState.claimProcessData.claimPayableList = lodash.map(
      draftState?.claimEntities?.claimPayableListMap,
      (item) => item?.id
    );

    if (
      !!getRemoveClaimPolicyPayable({
        claimPayableListMap: draftState.claimEntities.claimPayableListMap,
        policyNo: basicClaimPayable.policyNo,
      })
    ) {
      updateClaimPolicyPayableFun.updateNCDFlag(
        draftState,
        { policyNo: basicClaimPayable.policyNo },
        { isRemove: true }
      );
    }
  });
  return { ...nextState };
};

export default payableSeriesDelete;
