import type { IEffects } from '../interfaces/index';

/**
 * 回复功能
 * @param {string} categoryCode
 */
export default function* handleReply({ payload }: any, { put }: IEffects) {
  const { content, categoryCode } = payload;
  const newContent = `${content}\n----------------------------------------\n`;
  yield put({
    type: 'addInformationRecord',
    payload: {
      content: newContent,
      categoryCode,
    },
  });
  yield put({
    type: 'saveHistoryActiveKey',
    payload: {
      saveHistoryActiveKey: true,
    },
  });
  yield put({
    type: 'changeCollapseByCategory',
    payload: {
      categoryCode,
    },
  });
}
