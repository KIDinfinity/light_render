import { produce }  from 'immer';
import moment from 'moment';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { OPTREATMENTPAYABLE } from '@/utils/claimConstant';

const addOPTreatmentPayable = ({ draftState, treatmentId }: any) => {
  /**
   * 新增outPatientPayable逻辑
   * 1. outpatientTreatmentDateList:从treatmentListMap中找到treatmentId相同的opTreatmentList
   * 2. treatmentPayableList:获取当前的treatmentPayalbe,并且找到当前treatmentId的payable
   * 3. 遍历找到的treamentPayable,获取treatmentPayableId
   * 4. outPatientPayableDateList:根据treatmentPayableId从opTreatmentPayableListMap中找到匹配的列表
   * 5. 如从opTreatmentList中找出无法匹配中opTreatmentPayableListMap的日期，并且进行添加
   */
  const outpatientTreatmentDateList =
    lodash
      .chain(draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList)
      .values()
      .filter({ treatmentId })
      .value() || [];

  const treatmentPayableList =
    lodash
      .chain(draftState.claimEntities.treatmentPayableListMap)
      .values()
      .filter({ treatmentId })
      .value() || [];

  treatmentPayableList.forEach((payableItem: any) => {
    const { id, incidentId } = payableItem || {};
    const outPatientPayableDateList =
      lodash
        .chain(draftState.claimEntities.opTreatmentPayableListMap)
        .values()
        .filter((opPayableItem: any) => {
          return (
            opPayableItem.treatmentId === treatmentId && opPayableItem.treatmentPayableId === id
          );
        })
        .map((el: any) => el.dateOfConsultation)
        .value() || [];

    outpatientTreatmentDateList.forEach((opTreatmentItem: any) => {
      if (!lodash.includes(outPatientPayableDateList, opTreatmentItem.outpatientTreatmentDate)) {
        const opTreatmentPayableItemId = uuidv4();
        draftState.claimEntities.treatmentPayableListMap[id].opTreatmentPayableList = [
          ...draftState.claimEntities.treatmentPayableListMap[id].opTreatmentPayableList,
          opTreatmentPayableItemId,
        ];

        draftState.claimEntities.opTreatmentPayableListMap[opTreatmentPayableItemId] = {
          ...OPTREATMENTPAYABLE,
          id: opTreatmentPayableItemId,
          claimNo: draftState.claimProcessData.claimNo,
          treatmentPayableId: id,
          incidentId,
          treatmentId,
          opTreatmentId: opTreatmentItem?.id,
          dateOfConsultation: opTreatmentItem.outpatientTreatmentDate,
        };
      }
    });
  });
};

const saveOpTreatmentList = (state: any, action: any) => {
  const { treatmentId, opTreatmentList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const opTreatmentListObj = lodash
      .chain(opTreatmentList)
      .map((outpatientTreatmentDate) => {
        return {
          claimNo: draftState?.claimProcessData?.claimNo,
          treatmentId,
          outpatientTreatmentDate,
          id: uuidv4(),
        };
      })
      .value();

    draftState.claimEntities.treatmentListMap[treatmentId].opTreatmentList = lodash.orderBy(
      [
        ...(draftState.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList || ''),
        ...(opTreatmentListObj || ''),
      ],
      (item) => moment(item.outpatientTreatmentDate).valueOf(),
      ['asc']
    );

    addOPTreatmentPayable({ draftState, treatmentId });
  });
  return { ...nextState };
};

export default saveOpTreatmentList;
