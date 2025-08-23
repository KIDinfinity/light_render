import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { categoryReasonTemplate, id } = lodash.pick(action?.payload, [
    'categoryReasonTemplate',
    'id',
  ]);
  const { categoryReasonTemplate: categoryReasonTemplateList } = state;
  const categoryReasonTemplateItem = lodash.find(
    categoryReasonTemplateList,
    (item: any) => item?.id === id
  );
  const index = lodash.findIndex(categoryReasonTemplateList, (item: any) => item?.id === id);

  const nextState = produce(state, (draftState: any) => {
    if (index >= 0) {
      lodash.set(draftState, `categoryReasonTemplate[${index}]`, {
        ...categoryReasonTemplateItem,
        template: categoryReasonTemplate,
      });
    } else {
      lodash.set(draftState, 'categoryReasonTemplate', [
        ...lodash.get(draftState, 'categoryReasonTemplate'),
        {
          id,
          template: categoryReasonTemplate,
        },
      ]);
    }
  });
  return {
    ...nextState,
  };
};
