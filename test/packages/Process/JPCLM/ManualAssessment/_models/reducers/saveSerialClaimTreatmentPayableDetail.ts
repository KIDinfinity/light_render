import { produce }  from 'immer';
import lodash from 'lodash';
import EIsAdjustment from 'process/JPCLM/ManualAssessment/_models/enum/isAdjustment';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';

const clearData = {
  systemCalculationAmount: null,
  systemPayableDays: null,
  payableAmount: null,
  payableDays: null,
  assessorOverrideAmount: null,
  assessorOverrideDays: null,
};

const getIdList = (list: any) => {
  return list.map((el: any) => el.id) || [];
};

const addTreatmentItem = ({ draftState, incident, treatmentId, originData }: any) => {
  const { incidentId } = originData || {};

  if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
  }

  if (!lodash.isEmpty(incident.treatmentList) && lodash.isArray(incident.treatmentList)) {
    const treatmentItem =
      lodash.find(incident.treatmentList || [], (el) => el.id === treatmentId) || {};

    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      treatmentId,
    ];

    const treatmentList = draftState.claimEntities?.incidentListMap?.[incidentId].treatmentList;

    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...treatmentItem,
      incidentId,
      isAdjustment: EIsAdjustment.Y,
      originClaimNo: treatmentItem?.claimNo,
      treatmentNo: treatmentList.length + 1,
    };
  }
};

const addOptreatmentPayable = ({ draftState, opTreatmentPayableItem }: any) => {
  const newItem: any = {
    ...opTreatmentPayableItem,
    isAdjustment: EIsAdjustment.Y,
    adjustOriginPayableAmount: opTreatmentPayableItem.payableAmount,
    adjustOriginPayableDays: opTreatmentPayableItem.payableDays,
    remark: transRemarkCodeToMsg(opTreatmentPayableItem.remark, true),
    ...clearData,
  };

  draftState.claimEntities.opTreatmentPayableListMap[opTreatmentPayableItem.id] = { ...newItem };
};

const addTreatmentPayableItem = ({ draftState, treatmentPayable, claimPayableItem }: any) => {
  const newItem = {
    ...treatmentPayable,
    adjustOriginPayableAmount: treatmentPayable.payableAmount,
    adjustOriginPayableDays: treatmentPayable.payableDays,
    manualAdd: SwitchEnum.YES,
    isAdjustment: EIsAdjustment.Y,
    benefitCategory: claimPayableItem.benefitCategory,
    payableId: claimPayableItem?.id,
    ...clearData,
  };

  if (!!treatmentPayable.opTreatmentPayableList) {
    newItem.opTreatmentPayableList = getIdList(treatmentPayable?.opTreatmentPayableList);

    lodash.map(treatmentPayable?.opTreatmentPayableList || [], (opTreatmentPayableItem: any) => {
      addOptreatmentPayable({
        draftState,
        treatmentPayable,
        opTreatmentPayableItem,
      });
    });
  }

  draftState.claimEntities.treatmentPayableListMap[treatmentPayable.id] = {
    ...newItem,
  };
};

const changeClaimPayableItem = ({ draftState, treatmentPayableId, claimPayableItem }: any) => {
  draftState.claimEntities.claimPayableListMap[claimPayableItem.id] = {
    ...claimPayableItem,
    treatmentPayableList: [...claimPayableItem.treatmentPayableList, treatmentPayableId],
  };
};

const saveSerialClaimTreatmentPayableDetail = (state: any, action: any) => {
  const { list } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const originData = draftState?.serialClaim?.filterParams || {};
    lodash.map(list || [], (item: any) => {
      const { treatmentId, incident, claimPayable } = item || {};

      // 组装TreatmentItem
      addTreatmentItem({
        draftState,
        incident,
        treatmentId,
        originData,
      });

      const claimPayableItem =
        draftState.claimEntities.claimPayableListMap[originData.claimPayableId];

      lodash.map(claimPayable?.treatmentPayableList || [], (treatmentPayable: any) => {
        // 修改ClaimPayableItem
        changeClaimPayableItem({
          draftState,
          treatmentPayableId: treatmentPayable.id,
          claimPayableItem,
        });
        // 组装claimPayable
        addTreatmentPayableItem({ draftState, treatmentPayable, claimPayableItem });
      });
    });
  });

  return { ...nextState };
};

export default saveSerialClaimTreatmentPayableDetail;
