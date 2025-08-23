import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal, ChequeRemarkModal } from '../../_dto/Models';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { payeeId, chequeRemarkId, changedFields } = payload;

    const { payeeList } = draft.claimData;

    draft.claimData.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const payeeTemp = { ...payee };
        const { claimChequeRemarkList, id } = payeeTemp;
        if (id === payeeId) {
          payeeTemp.claimChequeRemarkList = lodash.map(
            claimChequeRemarkList,
            (remarkItem: ChequeRemarkModal) => {
              if (remarkItem.id === chequeRemarkId) {
                const currentRemark = formUtils.queryValue(changedFields.remark);

                return currentRemark?.length > 80
                  ? remarkItem
                  : { ...remarkItem, ...changedFields };
              }
              return remarkItem;
            }
          );
        }

        return payeeTemp;
      })
      .value();
  });
};
