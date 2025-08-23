import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { claimPayableAdd } from '../functions/payableAdd';
import lodash from 'lodash';
import { getPolicyForBenefitItemList } from 'basic/utils/PolicyUtils';

const addClaimPayableItem = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const basic = draftState?.popUpPayable?.basic;

    const claimPayableListMap = draftState?.claimEntities?.claimPayableListMap;
    const {
      policyNo,
      benefitTypeCode,
      coverageKey,
      incidentId,
    } = lodash.pick(formUtils.cleanValidateData(basic), [
      'policyNo',
      'coverageKey',
      'benefitTypeCode',
      'incidentId',
    ]);
    if (lodash.find(claimPayableListMap, { policyNo, benefitTypeCode })) {
      return;
    }

    const policyItemList = getPolicyForBenefitItemList({
      policyNo,
      listPolicy: draftState?.listPolicy,
      benefitTypeCode,
      coverageKey,
    });
    const payableId = uuidv4();
    const tempExtra = lodash.pick(policyItemList?.[0], [
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
