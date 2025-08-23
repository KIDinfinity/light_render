import { produce }  from 'immer';
import lodash from 'lodash';
// import { formUtils } from 'basic/components/Form';
// import BenefitLevelDecision from 'process/NB/Enum/BenefitLevelDecision';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash
      .chain(state)
      .get('businessData.policyList[0].coverageList', [])
      .map((coverageItem: any) => {
        // const coverageDecision = formUtils.queryValue(lodash
        //   .chain(coverageItem)
        //   .get('coverageDecision.uwDecision')
        //   .value());

        // if (coverageDecision === BenefitLevelDecision.NonStandard) {
        //   return {
        //     ...coverageItem,
        //     hasLoading: 'Y'
        //   }
        // }
        // return coverageItem
        return {
          ...coverageItem,
          hasLoading: 'Y',
        };
      })
      .value();

    lodash.set(draftState, 'businessData.policyList[0].coverageList', coverageList);
  });

  return {
    ...nextState,
  };
};
