import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const addLibrary = (state: any, action: any) => {
  const { list } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { activeCode } = draftState.searchData;
    const oldResultList = draftState.editData[activeCode];
    const newList = lodash.differenceBy(list, oldResultList, 'id');

    // eslint-disable-next-line no-param-reassign
    draftState.editData[activeCode] = lodash.unionWith(
      newList,
      oldResultList,
      (value1: any, value2: any) => {
        if (formUtils.queryValue(value1.atomCode) === formUtils.queryValue(value2.atomCode)) {
          return value2;
        }
      }
    );
  });
  return { ...nextState };
};
export default addLibrary;
