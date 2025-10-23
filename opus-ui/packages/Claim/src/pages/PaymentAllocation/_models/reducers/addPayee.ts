import { produce } from 'immer';
import lodash from 'lodash';
import { payeeAssembly } from '../../_function';

export default (state: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { claimData } = draft;

    const { payeeList } = draft.claimData;

    draft.claimData.payeeList = lodash
      .chain(payeeList)
      .concat(payeeAssembly(claimData))
      .compact()
      .value();
  });
};
