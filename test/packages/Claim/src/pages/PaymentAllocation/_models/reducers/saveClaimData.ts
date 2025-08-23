import lodash from 'lodash';
import { produce } from 'immer';
import { tenant, Region } from '@/components/Tenant';
import TaskDefKey from 'enum/TaskDefKey';
import { formUtils } from 'basic/components/Form';
import { updatePayoutAmount, getPolicyOwnerPayeeIds } from '../../_function';
import { validatorData } from '../../_validators/validatorData';
import calculateRedepositPolicy from '../../_function/calculateRedepositPolicy';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    let { claimData } = payload;
    const { reset, taskDetail, taskNotEditable } = payload;
    const { taskDefKey } = taskDetail || {};

    const totalPayableAmount = claimData?.claimDecision?.totalPayableAmount;

    // reset不存在且total payment amount数据存在的时候
    if (!reset) {
      claimData.payeeList = updatePayoutAmount(claimData.policyBenefitList, claimData.payeeList);
    }
    claimData.payeeList = calculateRedepositPolicy(claimData.payeeList);

    const relatePolicyOwnerPayeeIds = getPolicyOwnerPayeeIds(claimData.policyBenefitList);
    const regionRequire = tenant.region({
      [Region.PH]: true,
      notMatch: false,
    });

    if (
      !lodash.isEmpty(taskDetail) &&
      ((totalPayableAmount && !taskNotEditable) ||
        (regionRequire &&
          [TaskDefKey.PH_CLM_ACT005, TaskDefKey.BP_CLM_ACT004].includes(taskDefKey)))
    ) {
      claimData = validatorData(claimData, { taskDetail, relatePolicyOwnerPayeeIds });
    }
    lodash.map(claimData?.payeeList, (item) => {
      lodash.map(item?.payeeBankAccountList, (bankItem) =>
        lodash.set(bankItem, 'bankCodeCache', formUtils.queryValue(bankItem?.bankCode))
      );
    });
    draft.relatePolicyOwnerPayeeIds = relatePolicyOwnerPayeeIds;
    draft.claimData = claimData;
  });
};
