import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { expanded } = payload;
    lodash.forEach(
      draftState?.expandList,
      (setExpand: any) => lodash.isFunction(setExpand) && setExpand(expanded)
    );
  });
