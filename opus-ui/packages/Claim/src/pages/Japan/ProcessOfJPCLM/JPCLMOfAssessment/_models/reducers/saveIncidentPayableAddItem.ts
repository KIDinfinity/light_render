/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
import { produce } from 'immer';
import { isArray, isEmpty, get } from 'lodash';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import {
  getMainProductCodeByPolicyNo,
  getMappingPayableByPolicyNo,
  getPolicyCategoryByPolicyNo,
  getPolicySetupStatusByPolicyNo,
  checkPolicyNoDuplicate,
  getMappingPolicyByProduct,
  checkClaimPayableDuplicate,
  getMappingPolicyByBenefit,
  supplementClaimPayableItem,
  checkProductCodeDuplicate,
} from '../functions/claimPayableFunc';
import { updateExpectDecisionForUpdateClaimPayable } from '../functions/expectDecisionFunc';
// import { deleteErrorMessages } from '../functions';

const NONE = 'none';

const saveIncidentPayableAddItem = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { listPolicy } = state;
    const {
      incidentPayableAddItem,
      claimEntities,
      claimProcessData,
      // claimPayableListMap,
    } = draftState;
    // const claimPayableTemp = cloneDeep(claimPayableListMap);
    const { changedFields } = payload;
    let incidentPayableAdd = { ...incidentPayableAddItem, ...changedFields };
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];
      if (name === 'policyNo') {
        if (!isEmpty(value)) {
          incidentPayableAdd.policyCategory = getPolicyCategoryByPolicyNo(
            listPolicy,
            incidentPayableAdd
          );
          incidentPayableAdd.mainProductCode = getMainProductCodeByPolicyNo(
            listPolicy,
            incidentPayableAdd
          );

          const policySetupStatus = getPolicySetupStatusByPolicyNo(listPolicy, incidentPayableAdd);
          if (policySetupStatus) {
            incidentPayableAdd.policySetupStatus = policySetupStatus;
          }
          const isDuplicate = checkPolicyNoDuplicate(
            claimEntities.claimPayableListMap,
            incidentPayableAdd
          );
          if (!isDuplicate) {
            const mappingPayable = getMappingPayableByPolicyNo(
              claimEntities.claimPayableListMap,
              incidentPayableAdd
            );
            if (mappingPayable) {
              incidentPayableAdd.paymentAcceptedResult = mappingPayable.paymentAcceptedResult;
              incidentPayableAdd.assessmentResult = mappingPayable.assessmentResult;
              incidentPayableAdd.paymentAssessmentResult = mappingPayable.paymentAssessmentResult;
            }
            draftState.claimProcessData.claimPayableList = [
              ...draftState.claimProcessData.claimPayableList,
              incidentPayableAdd.id,
            ];
            draftState.claimEntities.claimPayableListMap[
              incidentPayableAdd.id
            ] = incidentPayableAdd;
            incidentPayableAdd = null;
          }

          // draftState.claimEntities.claimPayableListMap = deleteErrorMessages.delClaimPayablePolicy(
          //   claimPayableTemp,
          //   incidentPayableAdd.id
          // );
        }
      }
      // 修改产品
      if (name === 'productCode') {
        if (isArray(get(incidentPayableAdd, 'policyNo.errors'))) {
          incidentPayableAdd.policyNo.errors = null;
        }
        incidentPayableAdd.benefitTypeCode = null;
        // 匹配当前选中的保单，判断是RCS配置/RCS未配置
        const mappingPolicy = getMappingPolicyByProduct(listPolicy, incidentPayableAdd);
        const { coverageKey, policySetupStatus } = mappingPolicy;
        incidentPayableAdd.policySetupStatus = policySetupStatus;
        const isDuplicate = checkProductCodeDuplicate(
          claimEntities.claimPayableListMap,
          incidentPayableAdd
        );
        if (!isDuplicate) {
          if (policySetupStatus === PolicySetupStatus.NoImplement) {
            incidentPayableAdd.coverageKey = coverageKey;
            incidentPayableAdd.benefitTypeCode = NONE;
            // 把RCS未配置的payable同步到expectDecisionList
            updateExpectDecisionForUpdateClaimPayable(
              claimProcessData,
              claimEntities,
              incidentPayableAdd
            );
          }
          draftState.claimProcessData.claimPayableList = [
            ...draftState.claimProcessData.claimPayableList,
            incidentPayableAdd.id,
          ];
          draftState.claimEntities.claimPayableListMap[incidentPayableAdd.id] = incidentPayableAdd;
          incidentPayableAdd = null;
        }
      }
      // 修改给付责任
      if (name === 'benefitTypeCode') {
        if (isArray(get(incidentPayableAdd, 'productCode.errors'))) {
          incidentPayableAdd.productCode.errors = null;
        }
        // 匹配当前选中的保单
        const mappingPolicy = getMappingPolicyByBenefit(listPolicy, incidentPayableAdd);
        incidentPayableAdd.benefitCategory = mappingPolicy.benefitCategory;
        incidentPayableAdd.coverageKey = mappingPolicy.coverageKey;

        // claimPayableItem重复性校验
        const claimPayableExist = checkClaimPayableDuplicate(
          claimEntities.claimPayableListMap,
          incidentPayableAdd
        );
        if (!claimPayableExist) {
          draftState.claimProcessData.claimPayableList = [
            ...draftState.claimProcessData.claimPayableList,
            incidentPayableAdd.id,
          ];
          draftState.claimEntities.claimPayableListMap[incidentPayableAdd.id] = incidentPayableAdd;
          // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
          supplementClaimPayableItem(claimEntities, incidentPayableAdd);
          incidentPayableAdd = null;
        }
      }
    }
    draftState.incidentPayableAddItem = incidentPayableAdd;
  });
  return { ...nextState };
};

export default saveIncidentPayableAddItem;
