/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const reinstatementPath = `entities.transactionTypesMap[${transactionId}].uwPolicy`;
    const policyCoverageList = draftState.processData?.policyInfo?.policyCoverageList || [];
    const mainPolicyId = draftState.processData?.mainPolicyId;

    if (lodash.isEmpty(lodash.get(draftState, `${reinstatementPath}`))) {
      lodash.set(draftState, `${reinstatementPath}`, {
        policyId: mainPolicyId,
        uwCoverageList: [],
        uwPolicyDecision: {
          id: uuidv4(),
          policyId: mainPolicyId,
        },
      });
    }

    if (lodash.isEmpty(lodash.get(draftState, `${reinstatementPath}.uwCoverageList`))) {
      lodash.set(
        draftState,
        `${reinstatementPath}.uwCoverageList`,
        lodash.map(policyCoverageList, (item) => ({
          ...item,
          id: uuidv4(),
          clientId: item?.insuredClientId,
          lifeNo: item?.lifeNumber,
          uwCoverageExclusionList: (item?.coverageExclusionList || []).map((exclusion) => ({
            ...exclusion,
            id: uuidv4(),
          })),
          uwCoverageLoadingList: (item?.coverageLoadingList || []).map((loading) => {
            const NumberRateAdjust = Number(loading?.rateAdjust || 0);
            const NumberFlatMortality = Number(loading?.flatMortality || 0);
            const NumberDuration = Number(loading?.duration || 0);
            return {
              ...loading,
              id: uuidv4(),
              pmLoading: NumberRateAdjust > 0 ? NumberRateAdjust : null,
              pmPeriod: NumberRateAdjust > 0 ? NumberDuration : null,
              flatMortality: NumberFlatMortality > 0 ? NumberFlatMortality : null,
              fmPeriod: NumberFlatMortality > 0 ? NumberDuration : null,
            };
          }),
        }))
      );
    }

    lodash.set(draftState, `extraField.${StateSectionEnum.REINSTATEMENT}.total`, {
      basePremiumTotal: lodash.sumBy(policyCoverageList, 'basePremium') || 0,
      loadingPremiumTotal: lodash.sumBy(policyCoverageList, 'loadingPremium') || 0,
      instalmentPremiumWithTaxTotal:
        lodash.sumBy(policyCoverageList, 'instalmentPremiumWithTax') || 0,
    });
  });
