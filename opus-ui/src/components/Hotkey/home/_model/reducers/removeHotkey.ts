import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  let nextState = state;
  const {
    payload: { id },
  } = action;
  id.forEach((item: string) => {
    nextState = produce(nextState, (draft: any) => {
      draft.dynamicMergedConfigs = lodash
        .chain(draft.dynamicMergedConfigs)
        .filter((c) => c.id !== item)
        .map((m) => ({
          ...m,
          sections: lodash
            .chain(m.sections)
            .filter((s: any) => s.id !== item)
            .map((s) => ({
              ...s,
              fields: lodash
                .chain(s.fields)
                .filter((f: any) => f.id !== item)
                .value(),
            }))
            .value(),
        }))
        .value();

      return draft;
    });
  });

  return {
    ...nextState,
  };
};
