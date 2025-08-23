import { produce } from 'immer';

export default function saveRetryList(state: any, { payload }: any) {
  const { retryList, id } = payload;

  return produce(state, (draftState: any) => {
    draftState.retryListGroups[id] = retryList;
  });
}
