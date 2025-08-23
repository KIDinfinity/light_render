import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveIncidentDecisionItem = (state: any, action: any) => {
  const { changedFields, incidentDecisionId, listPolicy } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const cur = lodash.keys(changedFields);
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
      if (key === 'productCode') {
        temp.benefitTypeCode = '';
        temp.benefitCategory = '';
        // incidentDecisions唯一性校验
        const decision = lodash.filter(draftState.claimEntities.incidentDecisionListMap, (item) => {
          const decisionItem = formUtils.cleanValidateData(item);
          const isExist =
            decisionItem.incidentId === temp.incidentId &&
            decisionItem.policyId === temp.policyId &&
            decisionItem.productCode === temp.productCode;

          return isExist;
        });

        if (decision.length === 0) {
          // 过滤当前选中的保单
          const curPolicy =
            lodash.find(
              listPolicy,
              (item: any) =>
                item.policyNo === temp.policyId && item.coreProductCode === temp.productCode
            ) || {};
          temp.benefitCategory = curPolicy.benefitCategory;
          temp.benefitTypeCode = curPolicy.benefitTypeCode;
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
      draftState.claimEntities.incidentDecisionListMap[incidentDecisionId] = {
        ...temp,
        ...changedFields,
      };
    }
  });
  return { ...nextState };
};

export default saveIncidentDecisionItem;
