import { produce } from 'immer';
import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { formUtils } from 'basic/components/Form';
import validateClaimDecision from './validateClaimDecision';

const saveIncidentDecisionItem = (state: any, action: any) => {
  const { changedFields, incidentDecisionId, listPolicy } = action.payload;
  const cur = lodash.keys(changedFields);

  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData } = draftState;
    const newClaimEntities = draftState.claimEntities;
    if (cur.length === 1) {
      const [key] = cur;
      const temp = formUtils.cleanValidateData({
        ...(draftState.claimEntities.incidentDecisionListMap[incidentDecisionId] || {}),
        ...changedFields,
      });
      if (key === 'policyId') {
        temp.productCode = '';
        temp.benefitTypeCode = '';
        temp.benefitCategory = '';
      }
      // 修改产品
      if (key === 'benefitTypeCode') {
        temp.productCode = '';
        temp.benefitCategory = '';
        // incidentDecisions唯一性校验
        const decision = lodash.filter(draftState.claimEntities.incidentDecisionListMap, (item) => {
          const decisionItem = formUtils.cleanValidateData(item);
          const isExist =
            decisionItem.incidentId === temp.incidentId &&
            decisionItem.policyId === temp.policyId &&
            decisionItem.benefitTypeCode === temp.benefitTypeCode;

          return isExist;
        });
        if (decision.length === 0) {
          // 过滤当前选中的保单
          const curPolicy =
            lodash.find(
              listPolicy,
              (item: any) =>
                item.policyNo === temp.policyId && item.benefitTypeCode === temp.benefitTypeCode
            ) || {};
          temp.benefitCategory = curPolicy.benefitCategory;
          temp.productCode = curPolicy.coreProductCode;
          temp.coverageKey = curPolicy.coverageKey;
          temp.referenceDate = curPolicy.referenceDate;
          temp.benefitItemCode = '';
        } else {
          // edit.benefitTypeCode.errors = [
          //   {
          //     message: 'This payable benefit already exist.',
          //     field: 'benefitTypeCode',
          //   },
          // ];
        }
      }
      // 修改decisionn
      if (key === 'decision' && changedFields.decision.value !== 'D') {
        temp.denyCode = '';
      }
      if (key === 'decision') {
        const incidentDecisionListValue = cleanFieldsMeta(newClaimEntities.incidentDecisionListMap);
        incidentDecisionListValue[incidentDecisionId].decision = changedFields.decision.value;
        const existApprove = lodash.some(
          incidentDecisionListValue,
          (payableItem) => payableItem.decision === ClaimDecision.approve
        );
        const claimDecision = existApprove ? ClaimDecision.approve : ClaimDecision.deny;
        draftState.claimProcessData.claimDecision = {
          ...claimProcessData.claimDecision,
          assessmentDecision: claimDecision,
        };
      }
      draftState.claimEntities.incidentDecisionListMap[incidentDecisionId] = {
        ...temp,
        ...changedFields,
      };
    } else {
      draftState.claimEntities.incidentDecisionListMap[incidentDecisionId] = {
        ...state.claimEntities.incidentDecisionListMap[incidentDecisionId],
        ...changedFields,
      };
    }
  });
  let finalState = nextState;
  if (lodash.has(changedFields, 'decision') && cur.length === 1) {
    finalState = validateClaimDecision(nextState);
  }

  return { ...finalState };
};

export default saveIncidentDecisionItem;
