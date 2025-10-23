import mcChatControllerService from '@/services/mcChatControllerService';

/**
 * 当submit Information 的时候提交一次 archiveList
 */
export default function* (_, { select, call }) {
  const archiveList = yield select((state) => state.chatController.archiveList);
  return yield call(mcChatControllerService.archive, archiveList.archiveListParams);
}
