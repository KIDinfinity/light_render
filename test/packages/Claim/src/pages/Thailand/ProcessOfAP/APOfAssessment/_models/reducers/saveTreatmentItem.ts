import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveTreatmentItem = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;
  const finalChangedFields = { ...changedFields };

  const nextState = produce(state, (draftState) => {
    const showSurgicalPackage = draftState?.showSurgicalPackage || false;
    if (
      lodash.has(changedFields, 'medicalProvider') &&
      lodash.size(changedFields) === 1 &&
      showSurgicalPackage
    ) {
      // 获得medicalProvider 下面所有的procedureCode，并且去单独匹配，如果有
      // 匹配成功，则根据结果去变更对应procedureCode下面的SurgicalPackage
      const cleanMedicalProvider = formUtils.queryValue(changedFields.medicalProvider);
      const procedureIdList =
        draftState.claimEntities.treatmentListMap[treatmentId]?.procedureList || [];
      procedureIdList.forEach((procedureId) => {
        const procedureCode =
          formUtils.queryValue(
            draftState.claimEntities.procedureListMap[procedureId]?.procedureCode
          ) || '';
        const mapKey = `${cleanMedicalProvider}_${procedureCode}`;

        draftState.claimEntities.procedureListMap[procedureId] = {
          ...draftState.claimEntities.procedureListMap[procedureId],
          surgicalPackage: lodash.includes(draftState?.surgicalPackageMapList, mapKey) ? '1' : '0',
        };
      });
    }
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...draftState.claimEntities.treatmentListMap[treatmentId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveTreatmentItem;
