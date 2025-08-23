import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

const removeClaimIncidentPayableItem = (state: any, action: any) => {
  const { claimIncidentPayableId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const editPayable = formUtils.cleanValidateData(
      draftState.claimEntities.claimIncidentPayableListMap[claimIncidentPayableId]
    );

    lodash.set(
      draftState,
      `claimEntities.claimPayableListMap.${editPayable.payableId}.claimIncidentPayableList`,
      lodash.filter(
        draftState.claimEntities?.claimPayableListMap?.[editPayable.payableId]
          ?.claimIncidentPayableList,
        (id) => id !== claimIncidentPayableId
      )
    );

    if (
      lodash.size(
        draftState.claimEntities?.claimPayableListMap?.[editPayable.payableId]
          ?.claimIncidentPayableList
      ) === 0
    ) {
      lodash.set(
        draftState,
        'claimProcessData.claimPayableList',
        lodash.filter(
          draftState.claimProcessData?.claimPayableList,
          (id) => id !== editPayable?.payableId
        )
      );
      delete draftState.claimEntities.claimPayableListMap[editPayable.payableId];
    }
    delete draftState.claimEntities.claimIncidentPayableListMap[claimIncidentPayableId];
  });
  return { ...nextState };
};

export default removeClaimIncidentPayableItem;
