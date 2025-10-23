import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const claimEstimateInit = (state: any, { payload }: any) => {
  const { nonSupportClaimEstimation, claimNo } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.isEmpty(nonSupportClaimEstimation)) {
      const { policyCoverageList = [], policyContractList = [] } =
        draftState.businessData?.c360PolicyInfo || {};

      // const currentResultPolicy = claimEstimationResult?.policyNo;
      const currentSubmissionPolicy = draftState.businessData.insured.policyId;

      const extra = {
        policyNo: currentSubmissionPolicy,
        productCode:
          lodash
            .chain(policyCoverageList)
            .find({ policyId: currentSubmissionPolicy, coverageKey: '010100' })
            .get('productCode')
            .value() || '',

        sourceSystem:
          lodash
            .chain(policyContractList)
            .find({ policyId: currentSubmissionPolicy })
            .get('sourceSystem')
            .value() || '',
      };
      draftState.businessData.nonSupportClaimEstimation = {
        claimNo,
        nonSupportIncident: {
          nonSupportTreatmentList: [{ id: uuidv4() }],
          nonSupportProcedureList: [{ id: uuidv4() }],
        },
        claimEstimationResult: {
          ...extra,
          claimEstimationResultDetailList: [],
        },
      };
    } else {
      const { nonSupportIncident, claimEstimationResult = {} } = nonSupportClaimEstimation;
      const { nonSupportTreatmentList = [], nonSupportProcedureList = [] } =
        nonSupportIncident || {};

      draftState.businessData.nonSupportClaimEstimation = {
        ...nonSupportClaimEstimation,
        nonSupportIncident: {
          ...nonSupportIncident,

          // 接口返回可能会漏掉ID
          nonSupportTreatmentList: lodash.map(nonSupportTreatmentList, (item) => ({
            ...item,
            id: item.id || uuidv4(),
          })),
          nonSupportProcedureList: lodash.map(nonSupportProcedureList, (item) => ({
            ...item,
            id: item.id || uuidv4(),
          })),
        },
        // 默认写入submission policy
        claimEstimationResult: {
          ...claimEstimationResult,
        },
      };
    }
  });

  return { ...nextState };
};

export default claimEstimateInit;
