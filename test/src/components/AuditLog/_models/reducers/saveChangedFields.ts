import { produce } from 'immer';
import lodash from 'lodash';

const checkExitChange = (changedFieldsList: any[], changedFields: any, extraData: any) => {
  return lodash.some(changedFieldsList, (item: any) => {
    const { __change, ...res } = item;
    return lodash.isEqual(res, extraData) && lodash.has(changedFields, __change?.name);
  });
};

export default (state: any, action: any) => {
  const { changedFields, ...res } = action.payload;
  const newChangeFields = lodash.keys(changedFields).reduce((changeArrays: any, key: string) => {
    return changeArrays.concat({
      __change: { ...changedFields[key] },
      ...res,
    });
  }, []);
  const nextState = produce(state, (draftState: any) => {
    const isExitField = checkExitChange(draftState.changedFields, changedFields, res);
    if (isExitField) {
      draftState.changedFields = draftState.changedFields.map((item: any) => {
        const { __change, ...extra } = item;
        if (lodash.isEqual(res, extra) && lodash.has(changedFields, __change?.name)) {
          const { value, locale_new } = lodash.get(newChangeFields, '[0].__change');
          return {
            ...extra,
            __change: {
              ...__change,
              value: value || __change?.value,
              locale_new: locale_new || __change?.locale_new,
            },
          };
        }
        return item;
      });
    } else {
      draftState.changedFields = draftState.changedFields.concat(newChangeFields);
    }
  });
  return { ...nextState };
};
