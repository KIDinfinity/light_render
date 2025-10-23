import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { getPolicyOwnerPayeeIds } from '../_function';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { claimData, wholeEntities } = payload;

    const relatePolicyOwnerPayeeIds = getPolicyOwnerPayeeIds(claimData.policyBenefitList);

    lodash.map(claimData?.payeeList, (item) => {
      lodash.map(item?.payeeBankAccountList, (bankItem) =>
        lodash.set(bankItem, 'bankCodeCache', formUtils.queryValue(bankItem?.bankCode))
      );
    });

    draftState.paymentModal.datas = claimData;
    draftState.paymentModal = {
      ...draftState.paymentModal,
      datas: claimData,
      relatePolicyOwnerPayeeIds,
      wholeEntities,
    };
  });
};
