import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { isPartialBill, isPreArrangement } from 'claim/pages/Thailand/flowConfig';
import checkApprove from '../functions/checkApprove';
import checkInvoice from 'claim/pages/utils/checkInvoice';

export default function* getDenormalizedClaimData(_: never, { put, select }: any) {
  const { claimProcessData, claimEntities } = yield select(
    (state: any) => state.daOfClaimAssessmentController
  );
  const { processInstanceId, taskId, taskDefKey, taskStatus } = yield select(
    (state: any) => state.processTask.getTask
  );

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

  const followUpInquiryNoClaimList = yield put.resolve({
    type: 'followUpClaim/setInquiryNoClaimList',
  });

  const submitData = {
    ...content,
    taskId,
    taskDefKey,
    taskStatus,
    processInstanceId,
    variables: {},
    ...followUpInquiryNoClaimList,
  };

  // 前端提交数据时置空notificationList
  delete submitData.notificationList;

  if (isPartialBill(submitData.caseCategory)) {
    return checkApprove(submitData);
  }
  // preArrangement category 流程，根据treatment 中是否有invoice 做判断， 无invoice 时，claimCase.assess_opertaion 赋值为“only_assess”
  if (isPreArrangement(submitData.caseCategory)) {
    submitData.assessOperation = checkInvoice(submitData);
  }

  return submitData;
}
