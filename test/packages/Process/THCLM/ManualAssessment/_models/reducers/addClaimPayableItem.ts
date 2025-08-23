import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { claimPayableAdd } from '../functions/payableAdd';
import lodash from 'lodash';

const addClaimPayableItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const basic = draftState?.popUpPayable?.basic;
    const listPolicy = draftState?.listPolicy;
    const claimPayableListMap = draftState?.claimEntities?.claimPayableListMap;
    const { policyNo, benefitTypeCode, incidentId } = lodash.pick(
      formUtils.cleanValidateData(basic),
      ['policyNo', 'benefitTypeCode', 'incidentId']
    );
    if (lodash.find(claimPayableListMap, { policyNo, benefitTypeCode })) {
      return;
    }

    const policyItem = lodash.find(listPolicy, { policyNo, benefitTypeCode });
    const payableId = uuidv4();
    const tempExtra = lodash.pick(policyItem, [
      'policyNo',
      'benefitTypeCode',
      'coreProductCode',
      'policyCurrency',
      'productPlan',
      'coverageKey',
      'benefitCategory',
    ]);
    const extra = lodash.omit(
      { ...tempExtra, productCode: tempExtra?.coreProductCode },
      'coreProductCode'
    );
    claimPayableAdd({ draftState, incidentId, payableId, extra });
  });

  return { ...nextState };
};

export default addClaimPayableItem;
