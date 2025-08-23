import lodash from 'lodash';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import { confirm } from '@/services/owbRegistrationMedicalCheckControllerService';

export default function* (_: any, { select, call, put }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData
  );
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDetail
  );
  const { businessNo, inquiryBusinessNo, hospitalCategory, policyNo } = lodash.pick(businessData, [
    'businessNo',
    'inquiryBusinessNo',
    'hospitalCategory',
    'policyNo',
  ]);
  const { taskId, caseCategory, activityKey, caseNo } = lodash.pick(taskDetail, [
    'taskId',
    'caseCategory',
    'activityKey',
    'caseNo',
  ]);
  const hospitalCategoryValidate = !lodash.isEmpty(hospitalCategory);

  if (hospitalCategoryValidate) {
    const response = yield call(confirm, {
      businessNo,
      inquiryBusinessNo,
      hospitalCategory,
      policyNo,
      caseNo,
      taskId,
      caseCategory,
      activityKey,
    });
    const { success } = lodash.pick(response, ['success']);
    if (success) {
      yield put({
        type: 'setShowHospitalCategorySelect',
        payload: {
          showHospitalCategorySelect: false,
        },
      });

      yield put({
        type: `processTask/toogleMedicalRequestModal`,
        payload: {
          medicalRequestModalDisplay: false,
        },
      });
    }
  } else {
    yield put({
      type: 'setHospitalCategoryValidateStatus',
      payload: {
        hospitalCategoryValidateStatus: 'error',
      },
    });
  }
}
