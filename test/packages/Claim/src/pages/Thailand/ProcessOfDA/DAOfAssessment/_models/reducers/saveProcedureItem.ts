import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveProcedureItem = (state: any, action: any) => {
  const { procedureId, changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    const showSurgicalPackage = draftState?.showSurgicalPackage || false;
    const linkChange = {};
    if (
      lodash.has(changedFields, 'procedureCode') &&
      lodash.size(changedFields) === 1 &&
      showSurgicalPackage
    ) {
      // 获得medicalProvider 下面所有的procedureCode，并且去单独匹配，如果有
      // 匹配成功，则根据结果去变更对应procedureCode下面的SurgicalPackage
      const cleanProcedureCode = formUtils.queryValue(changedFields.procedureCode);
      const treatmentId = draftState.claimEntities.procedureListMap[procedureId]?.treatmentId;
      const medicalProvider = formUtils.queryValue(
        draftState.claimEntities.treatmentListMap[treatmentId]?.medicalProvider
      );
      const mapKey = `${medicalProvider}_${cleanProcedureCode}`;

      linkChange.surgicalPackage = lodash.includes(draftState?.surgicalPackageMapList, mapKey)
        ? '1'
        : '0';
    }

    draftState.claimEntities.procedureListMap[procedureId] = {
      ...state.claimEntities.procedureListMap[procedureId],
      ...changedFields,
      ...linkChange,
    };
  });

  return { ...nextState };
};

export default saveProcedureItem;
