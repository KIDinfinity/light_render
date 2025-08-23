import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { IEffects } from '../interfaces/index';

export default function* getCurrentActivityCategory(_: any, { select, put }: IEffects) {
  const navigatorInformationController = yield select(
    (state) => state.navigatorInformationController
  );
  const currentActivity = lodash.get(navigatorInformationController, 'currentActivity', {});
  const informationData = lodash.get(navigatorInformationController, 'informationData', {});

  const categoryCode = formUtils.queryValue(informationData?.categoryCode);
  const caseCategoryList = lodash.get(currentActivity, 'activityCategoryList', []) || [];
  const currrentActivityCategory =
    lodash.find(caseCategoryList, (item) => item?.categoryCode === categoryCode) || {};
  yield put({
    type: 'setCurrrentActivityCategory',
    payload: {
      currrentActivityCategory,
    },
  });
  return currrentActivityCategory;
}
