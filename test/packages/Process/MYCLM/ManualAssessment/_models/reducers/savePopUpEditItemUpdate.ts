/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { data } = draftState.PopUpEditPayable;
    draftState.PopUpEditPayable.data.children = lodash.map(data.children, (item: any) => {
      return item.id === id
        ? {
            ...item,
            ...changedFields,
          }
        : item;
    });

    const mapKeys = ['payableAmount', 'payableDays', 'boosterAmount', 'boosterDays'];
    lodash.map(mapKeys, (key) => {
      if (lodash.size(changedFields) === 1 && lodash.has(changedFields, key)) {
        let keyValue = 0;
        lodash.map(draftState.PopUpEditPayable.data.children, (item) => {
          keyValue = add(Number(keyValue), Number(formUtils.queryValue(item[key])));
        });
        draftState.PopUpEditPayable.data[key] = keyValue;
      }
    });
  });
  return { ...nextState };
};
