import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import { isPartialBill } from 'claim/pages/Thailand/flowConfig';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import checkApprove from '../functions/checkApprove';

export default function* (_, { select, put }) {
  const { claimProcessData, claimEntities, taskDetail } = yield select((state) => ({
    ...lodash.pick(state.daOfClaimAssessmentController, ['claimProcessData', 'claimEntities']),
    taskDetail: state.processTask.getTask,
  }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  if (lodash.isEmpty(claimData)) {
    return requestHandleType.break;
  }
  const followUpInquiryNoClaimList = yield put({
    type: 'followUpClaim/setInquiryNoClaimList',
  });

  const dataForSubmit = {
    ...claimData,
    ...lodash.pick(taskDetail, ['taskId', 'processInstanceId']),
  };
  const submitData = {
    ...dataForSubmit,
    ...followUpInquiryNoClaimList,
  };

  // 前端提交数据时置空notificationList
  delete submitData.notificationList;

  if (isPartialBill(submitData.caseCategory)) {
    return checkApprove(submitData);
  }
  return claimData;
}
