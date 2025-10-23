import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';

/**
 * information add 表单change 的时候的设置函数
 * @param {object} changedFields
 */
export default function* addInformationChange({ payload }: any, { put, select }: IEffects) {
  const { changedFields, id } = lodash.pick(payload, ['changedFields', 'id']);
  const addInformations = yield select(
    (state) => state?.navigatorInformationController?.addInformations
  );
  const newInformations = addInformations.map((item) => {
    if (item.id === id) {
      if (lodash.keys(changedFields)?.[0] === 'categoryCode') {
        return {
          ...item,
          ...changedFields,
          reason: null,
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
