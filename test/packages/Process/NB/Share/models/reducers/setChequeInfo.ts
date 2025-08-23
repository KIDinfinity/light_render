import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, changedFields } = lodash.pick(action?.payload, ['id', 'changedFields']);
  const nextState = produce(state, (draftState: any) => {
    const chequeInfoList = lodash
      .chain(draftState)
      .get('chequeInfoList', [])
      .map((item: any) => {
        if (item?.id === id) {
          return {
            ...item,
            ...changedFields,
          };
        }
        return item;
      })
      .value();

    lodash.set(draftState, 'chequeInfoList', chequeInfoList);
  });

  return {
    ...nextState,
  };
};
