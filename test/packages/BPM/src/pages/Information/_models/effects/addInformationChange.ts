import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';
import { formUtils } from 'basic/components/Form';

/**
 * information add 表单change 的时候的设置函数
 * @param {object} changedFields
 */
export default function* addInformationChange({ payload }: any, { put, select }: IEffects) {
  const { changedFields, id } = lodash.pick(payload, ['changedFields', 'id']);
  const { addInformations, currentActivity } = yield select(
    (state) => state?.navigatorInformationController
  );

  const getNewInformationTab = ({
    categoryCode,
    informationTab,
  }: {
    categoryCode: string | undefined;
    informationTab: string[] | undefined;
  }): string[] | undefined => {
    if (!categoryCode || !currentActivity) {
      return informationTab;
    }

    const activityCategory = lodash.find(
      currentActivity.activityCategoryList || [],
      (item) => item.categoryCode === categoryCode
    );

    const newInformationTab = activityCategory?.linkTo?.split(',') || [];
    return newInformationTab.length > 0 ? newInformationTab : informationTab;
  };

  const newInformations = addInformations.map((item) => {
    if (item.id === id) {
      if (lodash.keys(changedFields)?.[0] === 'categoryCode') {
        const newInformationTab = getNewInformationTab({
          informationTab: item.informationTab,
          categoryCode: formUtils.queryValue(changedFields.categoryCode),
        });

        return {
          ...item,
          ...changedFields,
          informationTab: newInformationTab,
          reason: null,
          content: null,
        };
      }
      return {
        ...item,
        ...changedFields,
      };
    }
    return item;
  });
  yield put({
    type: 'setAddInformations',
    payload: {
      record: newInformations,
    },
  });
  yield put({
    type: 'setExpenderContentModel',
    payload: {
      expenderModel: 'edit',
    },
  });
  // yield put ({
  //   type:'saveSnapshot',
  //   payload: {
  //     data:newInformations
  //   }
  // })
}
