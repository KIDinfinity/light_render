import lodash from 'lodash';
import { ECompareModule, CFileds } from 'claim/pages/utils/claimDataCompare';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

const actionsMapToModules = {
  saveIncidentItem: ECompareModule.Incident,
  saveTreatmentItem: ECompareModule.Treatment,
  saveDiagnosisItem: ECompareModule.Diagnosis,
  saveProcedureItem: ECompareModule.Procedure,
  saveOtherProcedureItem: ECompareModule.OtherProcedure,
  saveInvoiceItem: ECompareModule.Invoice,
  serviceUpdate: ECompareModule.Service,
};

export default function* ({ target, payload }: any, { put, call, select }: any) {
  yield call(delay, 10);
  const validating = yield select(
    ({ formCommonController }: any) => formCommonController.validating
  );
  if (validating) {
    yield put({
      type: 'saveEntry',
      target,
      payload: {
        ...payload,
      },
    });
    return;
  }
  yield put({
    type: target,
    payload: {
      ...payload,
    },
  });

  const currentModule = actionsMapToModules[target];
  const fieldsScope = CFileds[currentModule];
  const { changedFields } = payload || {};
  const fieldNames = lodash.keys(changedFields);

  if (fieldNames?.length === 1 && currentModule && !lodash.isEmpty(fieldsScope)) {
    const fieldName = lodash.first(fieldNames);
    if (lodash.includes(fieldsScope, fieldName)) {
      yield put({
        type: 'claimCaseController/saveModuleFields',
        payload: {
          module: currentModule,
          fieldName,
        },
      });
    }
  }
}
