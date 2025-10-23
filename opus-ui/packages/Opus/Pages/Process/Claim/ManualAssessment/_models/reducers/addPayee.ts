import { produce } from 'immer';
import lodash from 'lodash';
import { payeeAssembly } from '../functions/paymentAllocation';
import { SourceSystem } from 'process/Enum';

export default (state: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const datas = draft.paymentModal.datas;
    const { payeeList } = draft.paymentModal.datas;

    draft.paymentModal.datas.payeeList = lodash
      .chain(payeeList)
      .concat(
        payeeAssembly({
          ...datas,
          isLifeJ: draft?.claimProcessData?.insured?.policySource === SourceSystem.Lifej,
        })
      )
      .compact()
      .value();
  });
};
