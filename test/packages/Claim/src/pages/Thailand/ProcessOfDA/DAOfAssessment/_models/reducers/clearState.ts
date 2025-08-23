import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const clear = payload?.clear || [];
    const temp = lodash.reduce(
      clear,
      (result, item) => {
        if (item?.path) {
          lodash.set(result, item?.path, item.value);
        }
        return result;
      },
      { ...draftState }
    );

    draftState = temp;
  });
};
