import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }, { select }) {
  const { type } = lodash.pick(payload, ['type']);
  const { claimPayableList, claimEntities, taskDetail } = yield select((state) => ({
    claimPayableList: lodash.get(
      state.daOfClaimAssessmentController,
      'claimProcessData.claimPayableList'
    ),
    ...lodash.pick(state.daOfClaimAssessmentController, ['claimEntities']),
    taskDetail: state.processTask.getTask,
  }));
  // 泰国 policyNo默认
  let policyNo: string[] = [];
  if (claimPayableList && claimPayableList.length) {
    const claimPayable = Object.values(claimEntities.claimPayableListMap);
    policyNo = lodash.map(claimPayable, (item: any) => item.policyNo);
    // formUtils.cleanValidateData;
    policyNo = Array.from(new Set(formUtils.cleanValidateData(policyNo)));
  }
  const { caseCategory, businessNo, taskDefKey, inquiryBusinessNo } = taskDetail;
  return {
    action: type,
    activityKey: taskDefKey,
    caseCategory,
    businessNo,
    inquiryBusinessNo,
  };
}
