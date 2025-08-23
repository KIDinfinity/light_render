import { produce } from 'immer';
import { generateCurrencis } from 'claim/pages/utils/handleExchangeRate';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { listPolicy: listPolicyExsit } = draft;
    const { listPolicy } = payload;

    draft.currencies = generateCurrencis(listPolicy || listPolicyExsit);
  });
};
