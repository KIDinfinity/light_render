import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { setExpand } = payload;
    const temp = draftState;
    lodash.set(temp, 'expandList', [
      ...(lodash.isArray(temp?.expandList) ? temp.expandList : []),
      setExpand,
    ]);
  });
