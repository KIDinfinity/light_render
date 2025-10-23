import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { IEffects } from '../interfaces/index';

/**
 * fileds change 的附加动作
 */
export default function* changeFieldsEffects({ payload }: any, { put }: IEffects) {
  const changedFields = lodash.get(payload, 'changedFields', {});
  const changeKeys = lodash.keys(changedFields);
  const categoryCode = formUtils.queryValue(changedFields.categoryCode);
  if (changeKeys.includes('caseNo')) {
    yield put({
      type: 'checkAddInfoPermission',
      paylad: lodash.pick(changedFields, 'caseNo'),
    });
  }
  if (changeKeys.includes('activityCode')) {
    const defaultActivityCode = lodash.get(changedFields, 'activityCode.value', '');
    yield put({
      type: 'setDefaultCategoryByActivivityCode',
      payload: {
        activityCode: defaultActivityCode,
      },
    });
  }
  if (changeKeys.includes('categoryCode')) {
    yield put({
      type: 'changeCollapseByCategory',
      payload: {
        categoryCode,
      },
    });
  }
}
