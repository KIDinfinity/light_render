import { produce } from 'immer';
import { has, pick, merge, forEach } from 'lodash';
import { TreatmentType } from '../enum/TreatmentType';
import { formUtils } from 'basic/components/Form';
import { compareCurrenthourTargethour } from '@/utils/validationsUtil';
import { clearErrorMsgValidated } from '../functions';

const saveTreatmentItemCallback = (state: any, { payload }: any) => {
  const { changedFields, treatmentId } = payload;

  const nextState = produce(state, (draftState: any) => {
    let currentTreatment = draftState.claimEntities.treatmentListMap[treatmentId];
    const { procedureListMap } = draftState.claimEntities;
    // 需要做清除处理的字段
    const clearKeys: string[] = ['icuFromDateString'];
    const clearKeysProcedure: string[] = ['operationDateString'];
    const filterKeys = clearKeys.concat(clearKeysProcedure);
    filterKeys.push('treatmentType');

    if (
      formUtils.queryValue(currentTreatment.treatmentType) === TreatmentType.OutPatient &&
      filterKeys.some((item: any) => has(changedFields, item))
    ) {
      // 对指定的字段进行校验处理
      const validateFields = {
        // dateOfDischargeString: compareCurrenthourTargethour(
        //   formUtils.queryValue(currentTreatment.dateOfDischargeString),
        //   formUtils.queryValue(currentTreatment.dateOfAdmissionString)
        // ),
        icuFromDateString: compareCurrenthourTargethour(
          formUtils.queryValue(currentTreatment.icuFromDateString),
          formUtils.queryValue(currentTreatment.dateOfAdmissionString)
        ),
        // icuToDateString: compareCurrenthourTargethour(
        //   formUtils.queryValue(currentTreatment.icuToDateString),
        //   formUtils.queryValue(currentTreatment.icuFromDateString)
        // ),
      };
      // 从当前数据对象中取出需要检验字段以及值
      const clearPossible = pick(currentTreatment, clearKeys);
      const clearData = clearErrorMsgValidated(clearPossible, validateFields);
      currentTreatment = merge(currentTreatment, clearData);

      const { procedureList } = currentTreatment;

      forEach(procedureList, (id: any) => {
        const currentProcedure = procedureListMap[id];
        const validateFields = {
          operationDateString:
            compareCurrenthourTargethour(
              formUtils.queryValue(currentProcedure.operationDateString),
              formUtils.queryValue(currentTreatment.dateOfAdmissionString)
            ) ||
            compareCurrenthourTargethour(
              formUtils.queryValue(currentTreatment.dateOfDischargeString),
              formUtils.queryValue(currentProcedure.operationDateString)
            ),
        };
        const clearPossible = pick(currentProcedure, clearKeysProcedure);
        const clearData = clearErrorMsgValidated(clearPossible, validateFields);
        procedureListMap[id] = merge(currentProcedure, clearData);
      });
    }

    draftState.claimEntities.treatmentListMap[treatmentId] = currentTreatment;
  });
  return { ...nextState };
};

export default saveTreatmentItemCallback;
