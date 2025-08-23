import { produce, setAutoFreeze } from 'immer';
setAutoFreeze(false);

export default (handlers, defaultState) => {
  return (state = defaultState, action) => {
    const { type } = action;

    const ret = produce(state, (draft) => {
      const handler = handlers[type];
      if (handler) {
        const compatiableRet = handler(draft, action);
        if (compatiableRet !== void 0) {
          // which means you are use redux pattern
          // it's compatiable. https://github.com/mweststrate/immer#returning-data-from-producers
          return compatiableRet;
        }
      }
    });
    return ret === void 0 ? {} : ret;
  };
};
