import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const payload = lodash.get(action, 'payload');
  const nextState = produce(state, (draftState: any) => {
    lodash
      .chain(payload)
      .entries()
      .forEach((item) => {
        const [key, value] = item;
        if (!!value || !!key) {
          lodash.set(draftState, key, value);
        }
      })
      .value();
  });
  return {
    ...nextState,
  };
};
