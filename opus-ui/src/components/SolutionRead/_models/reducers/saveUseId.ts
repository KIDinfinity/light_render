import { produce } from 'immer';
import { LS, LSKey } from '@/utils/cache';

export default function saveUseId(state: any) {
  return produce(state, (draftState: any) => {
    const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};

    if (draftState.readUserId !== userId) {
      draftState.readUserId = userId;
    }
  });
}
