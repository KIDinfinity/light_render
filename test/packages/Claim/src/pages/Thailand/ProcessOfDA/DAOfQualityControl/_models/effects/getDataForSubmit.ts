import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import { isPartialBill, isPreArrangement } from 'claim/pages/Thailand/flowConfig';
import checkInvoice from 'claim/pages/utils/checkInvoice';
import checkApprove from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_models/functions/checkApprove';

export default function* getDataForSubmit(_, { select, put }) {
  const { claimProcessData, claimEntities, taskDetail } = yield select((state) => ({
    ...lodash.pick(state.daOfClaimCaseController, ['claimProcessData', 'claimEntities']),
    taskDetail: state.processTask.getTask,
  }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const followUpInquiryNoClaimList = yield put.resolve({
    type: 'followUpClaim/setInquiryNoClaimList',
  });
  const { taskId, processInstanceId } = lodash.pick(taskDetail, ['taskId', 'processInstanceId']);
  const dataForSubmit = {
    ...claimData,
    taskId,
    processInstanceId,
    variables: {},
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

  // preArrangement category 流程，根据treatment 中是否有invoice 做判断， 无invoice 时，claimCase.assess_opertaion 赋值为“only_assess”
  if (isPreArrangement(submitData.caseCategory)) {
    submitData.assessOperation = checkInvoice(submitData);
  }

  return submitData;
}
