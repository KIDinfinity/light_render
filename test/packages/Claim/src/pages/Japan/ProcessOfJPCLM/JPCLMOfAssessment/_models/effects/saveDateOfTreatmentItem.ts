import lodash, { get, isArray } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { DATEOFTREATMENTITEM } from '@/utils/claimConstant';
import{ v4 as  uuidv4 } from 'uuid';

export default function* saveDateOfTreatmentItem(action: any, { select, put }: any) {
  const { changedFields, treatmentDateId, treatmentId, medicineId } = action.payload;

  const targetJpTreatmentDateList = yield select(
    (state: any) =>
      state.JPCLMOfClaimAssessmentController.claimEntities.jpMedicineTreatmentListMap[medicineId]
        .jpTreatmentDateList
  );
  if (
    (isArray(targetJpTreatmentDateList) && targetJpTreatmentDateList.length === 1) ||
    get(changedFields, 'treatmentDate.value')
  ) {
    yield put({
      type: 'saveDateOfTreatmentItemReducer',
      payload: {
        changedFields,
        treatmentId,
        medicineId,
        treatmentDateId,
      },
    });
  }

  const jpTreatmentDateListMap = yield select(
    (state: any) => state.JPCLMOfClaimAssessmentController.claimEntities.jpTreatmentDateListMap
  );

  let targetJpTreatmentDateListMap: any[] = [];
  if (isArray(targetJpTreatmentDateList)) {
    targetJpTreatmentDateListMap = lodash.filter(jpTreatmentDateListMap, (v, vkey) =>
      lodash.includes(targetJpTreatmentDateList, vkey)
    );
  }

  const treatmentDateHasNil = lodash.find(
    targetJpTreatmentDateListMap,
    (v) => !formUtils.queryValue(v.treatmentDate)
  );

  if (!get(changedFields, 'treatmentDate.value') && treatmentDateHasNil.id !== treatmentDateId) {
    yield put({
      type: 'removeDateOfTreatmentItem',
      payload: {
        treatmentId,
        medicineId,
        treatmentDateId,
      },
    });
  }

  if (!treatmentDateHasNil) {
    const { claimNo } = action.payload;
    const addDateOfTreatmentItem = {
      ...DATEOFTREATMENTITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
      medicineId,
    };
    yield put({
      type: 'addDateOfTreatment',
      payload: {
        addDateOfTreatmentItem,
        medicineId,
      },
    });
  }
}
