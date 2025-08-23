import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, changedFields } = lodash.pick(action?.payload, ['id', 'changedFields']);
  const nextState = produce(state, (draftState: any) => {
    const addingLoadingItems = lodash
      .chain(state)
      .get('addingLoadingItems', [])
      .map((item: any) => {
        if (id === item.id) {
          let extraChangeFields = {};
          if (lodash.has(changedFields, 'extraMortality')) {
            extraChangeFields = {
              pmLoading: null,
              pmPeriod: null,
              flatMortality: null,
              fmPeriod: null,
              emPeriod: null,
            };
            if (lodash.get(changedFields, 'extraMortality') !== '') {
              extraChangeFields = {
                ...extraChangeFields,
              };
            }
          }
          if (lodash.has(changedFields, 'pmLoading')) {
            extraChangeFields = {
              pmPeriod: null,
              extraMortality: null,
              emPeriod: null,
              flatMortality: null,
              fmPeriod: null,
            };
            if (lodash.get(changedFields, 'pmLoading')) {
              extraChangeFields = {
                ...extraChangeFields,
              };
            }
          }
          if (lodash.has(changedFields, 'flatMortality')) {
            extraChangeFields = {
              pmLoading: null,
              pmPeriod: null,
              fmPeriod: null,
              emPeriod: null,
              extraMortality: null,
            };
            if (lodash.get(changedFields, 'pmLoading') !== '') {
              extraChangeFields = {
                ...extraChangeFields,
              };
            }
          }
          return {
            ...item,
            ...changedFields,
            ...extraChangeFields,
          };
        }
        return item;
      })
      .value();
    lodash.set(draftState, 'addingLoadingItems', addingLoadingItems);
  });
  return { ...nextState };
};
