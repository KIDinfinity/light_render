import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const mibInfoList = lodash
      .chain(draftState)
      .get('processData.mibInfoList')
      .map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            ...changedFields,
          };
        }
        return item;
      })
      .value();
    lodash.set(draftState, `processData.mibInfoList`, mibInfoList);
  });
  return {
    ...nextState,
  };
};
