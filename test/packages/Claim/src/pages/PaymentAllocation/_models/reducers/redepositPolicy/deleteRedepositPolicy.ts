import { produce } from 'immer';
import lodash from 'lodash';
import type { PayeeModal } from '../../../_dto/Models';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { claimData } = draft;
    const { payeeList } = claimData;
    const { payeeId, redepositPolicyId } = payload;

    claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { claimRedepositList, id } = payee;
        if (id === payeeId) {
          // eslint-disable-next-line no-param-reassign
          payee.claimRedepositList = lodash.filter(
            claimRedepositList,
            (redepositPolicyItem) => redepositPolicyItem.id !== redepositPolicyId
          );
        }
        return payee;
      })
      .value();

    draft.claimData = claimData;
  });
};
