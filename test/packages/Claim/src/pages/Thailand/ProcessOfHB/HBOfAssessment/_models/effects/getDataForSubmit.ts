import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { denormalizeClaimData } from '@/utils/claimUtils';

export default function* (_, { select }) {
  const taskDetail = yield select((state) => state.processTask.getTask);
  const { processInstanceId, taskId, businessNo: claimNo } = taskDetail;
  const {
    claimProcessData,
    claimEntities,
    claimHospitalBillAdjust,
    claimHospitalBillingDetail,
  } = yield select((state) => state.hbOfClaimAssessmentController);

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  if (lodash.isEmpty(claimData)) {
    return requestHandleType.break;
  }
  const dataForSubmit = {
    daClaimAssessmentVO: claimData,
    claimHospitalBillAdjustVO: {
      ...formUtils.formatFlattenValue(formUtils.cleanValidateData(claimHospitalBillAdjust)),
      claimNo,
    },
    claimHospitalBillingDetailVO: claimHospitalBillingDetail,
    taskId,
    processInstanceId,
    variables: {},
    claimNo,
  };
  return dataForSubmit;
}
