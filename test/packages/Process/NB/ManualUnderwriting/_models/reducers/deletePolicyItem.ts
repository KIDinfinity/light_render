import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const takeOverList = lodash.get(draftState, 'businessData.takeOverList');
    const index = lodash.findIndex(takeOverList, (item: any) => item?.id === id);
    if (takeOverList.length === 1) {
      const itemId = lodash.get(draftState, `businessData.takeOverList[${index}].id`);
      lodash.set(draftState, `businessData.takeOverList[${index}]`, {
        id: itemId,
      });
    } else {
      lodash.set(
        draftState,
        `businessData.takeOverList`,
        lodash.filter(takeOverList, (item) => item.id !== id)
      );
    }
  });
  return { ...nextState };
};
