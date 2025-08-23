import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';

/**
 * 当chat link 到 information 的时候判断是否要设置categoryCode为remark
 * @param param0
 * @param param1
 */
export default function* setInforamtionCasegetoryToRemakWhenChatLink(
  { payload }: any,
  { select, put }: IEffects
) {
  const { content } = lodash.pick(payload, ['activityCode', 'content']);
  const currentActivity = yield select(
    (state) => state.navigatorInformationController?.currentActivity
  );

  const keys = lodash.map(currentActivity?.activityCategoryList, (item) => item?.categoryCode);
  if (keys.includes('remark')) {
    yield put({
      type: 'addInformationRecord',
      payload: {
        content,
        categoryCode: 'remark',
      },
    });
  }
}
