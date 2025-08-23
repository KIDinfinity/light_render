import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    const policyDetail = draftState.businessData?.policyList[0];
    draftState.businessData.policyList[0] = {
      ...policyDetail,
      coverageList: lodash.map(policyDetail.coverageList, (coverItem: any) => {
        return coverItem.isMain === 'Y'
          ? {
              ...coverItem,
              coverageBenefitsList: lodash.map(
                coverItem.coverageBenefitsList,
                (benefitItem: any) => {
                  return benefitItem.coverageId === coverItem.id
                    ? {
                        ...benefitItem,
                        ...changedFields,
                      }
                    : benefitItem;
                }
              ),
            }
          : coverItem;
      }),
    };
  });

  return { ...nextState };
};
