import { produce }  from 'immer';
import lodash from 'lodash';

const packDataForSubmit = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const getPolicyList = (claimPayable) => {
      const policyList = lodash.filter(
        draftState?.listPolicy,
        (policy) =>
          policy.policyNo === claimPayable?.policyNo &&
          policy.coreProductCode === claimPayable?.productCode
      );

      return policyList;
    };
    const incidentListIdArr = lodash.map(
      draftState?.claimEntities.incidentListMap,
      (item) => item?.id
    );
    lodash
      .chain(draftState?.claimEntities?.claimPayableListMap)
      .filter((item) => {
        return lodash.includes(incidentListIdArr, item?.incidentId);
      })
      .forEach((item) => {
        const curPolicyList = getPolicyList(item);
        const curPolicy = lodash.find(curPolicyList, {
          benefitTypeCode: item?.benefitTypeCode,
        });
        draftState.claimEntities.claimPayableListMap[item?.id].specEndorse = lodash.get(
          curPolicy,
          'specEndorse'
        );
      })
      .value();
  });
  return { ...nextState };
};

export default packDataForSubmit;
