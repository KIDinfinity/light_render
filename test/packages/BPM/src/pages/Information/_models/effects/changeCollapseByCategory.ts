import lodash from 'lodash';
import { ApplicationType } from '@/utils/constant/information';
import type { IEffects } from '../interfaces/index';

/**
 * 根据当前caseCategory 判断是否要将添加information的Collapse展开
 * @param param0
 * @param param1
 */
export default function* changeCollapseByCategory({ payload }: any, { put, select }: IEffects) {
  const categoryCode = lodash.get(payload, 'categoryCode', '');
  const navigatorInformationController = yield select(
    (state) => state.navigatorInformationController
  );
  const {
    currentActivity = {},
    collapseActiveKey,
    newRecordCollapseActiveKey,
  } = navigatorInformationController;
  const caseCategoryList = lodash.get(currentActivity, 'activityCategoryList', []) || [];
  const currrentActivityCategory =
    lodash.find(caseCategoryList, (item) => item.categoryCode === categoryCode) || {};
  const applicationType = lodash.get(currrentActivityCategory, 'applicationType', '');
  const newRecordInformationSet = new Set(newRecordCollapseActiveKey);
  const informationSet = new Set(collapseActiveKey);
  if (applicationType === ApplicationType.Both) {
    newRecordInformationSet.add('addInformationListItem');
    informationSet.add('AddInformationList');
  } else {
    newRecordInformationSet.delete('addInformationListItem');
  }
  yield put({
    type: 'changeCollapse',
    payload: {
      collapseActiveKey: [...informationSet],
    },
  });
  yield put({
    type: 'changeNewRecordCollapse',
    payload: {
      newRecordCollapseActiveKey: [...newRecordInformationSet],
    },
  });
}
