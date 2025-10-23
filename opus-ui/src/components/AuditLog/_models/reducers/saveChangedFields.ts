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
      __change: lodash.isObject(changedFields[key]) ? { ...changedFields[key] } : {},
      ...res,
    });
  }, []);
  const nextState = produce(state, (draftState: any) => {
    const isExitField = checkExitChange(draftState.changedFields, changedFields, res);
    if (isExitField) {
      draftState.changedFields = draftState.changedFields.map((item: any) => {
        const { __change, ...extra } = item;
        if (lodash.isEqual(res, extra) && lodash.has(changedFields, __change?.name)) {
          //需要匹配上fieldName才可以把changedField中的value替换上去，反之return 原item
          const finalNewChangeField = newChangeFields.find(
            (ele) => ele?.__change?.name === item?.__change?.name
          );
          if (finalNewChangeField?.__change) {
            const { value, locale_new, locale_old, format } = finalNewChangeField?.__change;
            const currentField = newChangeFields?.filter(
              (ele) => ele?.__change?.name === item.__change?.name
            )?.[0];
            let label;
            if (currentField) {
              label = currentField.__change?.label;
            }
            return {
              ...extra,
              __change: {
                ...__change,
                value: value,
                locale_new: locale_new || __change?.locale_new,
                locale_old: locale_old || __change?.locale_old,
                label: label || __change?.label,
                format,
              },
            };
          } else {
            return item;
          }
        }
        return item;
      });
    } else {
      draftState.changedFields = draftState.changedFields.concat(newChangeFields);
    }
  });
  return { ...nextState };
};
