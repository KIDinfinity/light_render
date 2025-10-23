import { produce } from 'immer';
import lodash from 'lodash';
import type { BeneficiaryModal } from '../dto';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { beneficiaryId } = payload;

    const { datas } = draft.paymentModal;
    const { beneficiaryList } = datas;

    draft.paymentModal.datas.beneficiaryList = lodash.filter(
      beneficiaryList,
      (beneficiary: BeneficiaryModal) => beneficiary.id !== beneficiaryId
    );
  });
};
