import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import { MAINBENEFITITEM } from '@/utils/claimConstant';

const addMainBenefitItem = (state: any, action: any) => {
  const { treatmentId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const claimNo = draftState?.claimProcessData?.claimNo;
    const addMainBenefitItemInfo = {
      ...MAINBENEFITITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
    };
    if (!draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList) {
      draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].mainBenefitList,
      addMainBenefitItemInfo.id,
    ];
    draftState.claimEntities.mainBenefitListMap[addMainBenefitItemInfo.id] = addMainBenefitItemInfo;
  });
  return { ...nextState };
};

export default addMainBenefitItem;
