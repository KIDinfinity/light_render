import lodash from 'lodash';
import { v2 as reAllocation } from '@/services/claimBeneficiaryControllerService';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

import {
  getPolicyBenefits,
  benefitAmountMatch,
  beneficiaryPayeeMatch,
  getPolicyBenefitAdd,
  getPayeeDicts,
  supplementClaimData,
} from '../_function';

/**
 *
 * 1.反扁平化数据
 * 2.比较ClaimPayableList是否有改动

 */
export default function* showPaymentModal(
  _: any,
  { call, put, select }: any
): Generator<any, any, any> {
  let newClaimData: any = yield put.resolve({
    type: 'getDataForSubmit'
  });

  if(!lodash.isEmpty(newClaimData.claimPayableList)) {
    const params = formUtils.cleanValidateData(newClaimData);
    const response = yield call(reAllocation, params);

    if (
      lodash.isPlainObject(response) &&
      !!response.success &&
      lodash.isPlainObject(response?.resultData)
    ) {
      // 此处对新的claim data补数据
      const supplemented = supplementClaimData(response?.resultData);

      newClaimData = {
        ...newClaimData,
        ...lodash.pick(supplemented, ['payeeList', 'policyBenefitList', 'c360BeneficiaryInfo']),
      };
    } else {
      //
      // 若policy benefit 不存在，则根据claim data生成基础数据，以供manual分配
      if (lodash.isEmpty(newClaimData?.policyBenefitList)) {
        lodash.set(newClaimData, 'policyBenefitList', getPolicyBenefits(newClaimData));
      }
      // 此处对新的claim data补数据
      const supplemented = supplementClaimData(newClaimData);
      const { policyBenefitList, c360BeneficiaryInfo } = supplemented;
      const { policyBenefitList: policyBenefitListO } = newClaimData;

      lodash.set(newClaimData, 'c360BeneficiaryInfo', c360BeneficiaryInfo);

      if (!lodash.isEmpty(policyBenefitList) && !lodash.isEmpty(policyBenefitListO)) {
        const policyBenefitListTemp = benefitAmountMatch(policyBenefitList, policyBenefitListO);
        const result = beneficiaryPayeeMatch(newClaimData, policyBenefitListTemp);
        lodash.set(newClaimData, 'policyBenefitList', result.policyBenefitList);
      }
    }
  } else {
    lodash.set(newClaimData, 'policyBenefitList', []);
  }


  // 特殊处理ph claim appeal的policy benefit
  if (!newClaimData.claimNo) {
    tenant.region({
      [Region.PH]: () => {
        const { policyBenefitList } = newClaimData;
        const isManualAdd = getPolicyBenefitAdd(policyBenefitList);
        if (!isManualAdd)
          lodash.set(newClaimData, 'policyBenefitList', getPolicyBenefits(newClaimData));
      },
    });
  }

  yield put.resolve({
    type: 'paymentSavePaymentData',
    payload: {
      claimData: newClaimData,
    },
  });

  yield put({
    type: 'paymentSavePaymenShow',
  });

  yield put({
    type: 'paymentSavePaymentPayeeDicts',
    payload: {
      payeeDicts: getPayeeDicts(newClaimData?.payeeList),
    },
  });
}
