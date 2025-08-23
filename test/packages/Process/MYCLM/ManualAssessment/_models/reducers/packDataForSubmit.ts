import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getPolicyNoList } from 'basic/utils/PolicyUtils';

const packDataForSubmit = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const getPolicyList = (claimPayable) => {
      return getPolicyNoList({
        listPolicy: draftState?.listPolicy,
        policyNo: claimPayable?.policyNo,
        coreProductCode: claimPayable?.productCode,
      });
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
        const cleanItem = formUtils.cleanValidateData(item);
        const curPolicyList = getPolicyList(cleanItem);
        const curPolicy = lodash.find(curPolicyList, {
          benefitTypeCode: cleanItem?.benefitTypeCode,
        });
        draftState.claimEntities.claimPayableListMap[cleanItem?.id].specEndorse = lodash.get(
          curPolicy,
          'specEndorse'
        );
      })
      .value();
  });
  return { ...nextState };
};

export default packDataForSubmit;
