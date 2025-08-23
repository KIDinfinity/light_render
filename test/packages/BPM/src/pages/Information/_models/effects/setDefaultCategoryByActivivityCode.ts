import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { IEffects } from '../interfaces/index';

/**
 * 根据activeCode 设置默认defaultCategoryCode
 * @param activityCode taskDefKey 的值
 */
export default function* setDefaultCategoryByActivivityCode(
  { payload }: any,
  { select, put }: IEffects
) {
  const currentActivity = yield select(
    (state: any) => state.navigatorInformationController?.currentActivity,
    []
  );

  if (!lodash.isEmpty(currentActivity)) {
    const activeCategory = lodash.get(currentActivity, 'defaultCategoryCode', '');
    const cacheCategory = yield select(
      (state: any) => state.navigatorInformationController?.informationData?.categoryCode
    );
    const formatCacheCategory = formUtils.queryValue(cacheCategory);
    if (!lodash.isEmpty(formatCacheCategory) || !lodash.isEmpty(activeCategory)) {
      yield put({
        type: 'changeInformationFields',
        payload: {
          changedFields: {
            categoryCode: formatCacheCategory || activeCategory,
          },
        },
      });
    }
    yield put({
      type: 'changeCollapseByCategory',
      payload: {
        categoryCode: activeCategory,
      },
    });
  }
}
