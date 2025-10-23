import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const { content, category } = action.payload;
  const { allCategoryHistory } = state;
  const newList = lodash
    .chain(allCategoryHistory)
    .compact()
    .filter((item: any) => item.categoryCode === category)
    .first()
    .get('informationList')
    .value();

  const categoryContent = lodash
    .chain(newList)
    .compact()
    .filter((item: any) => item?.informationDOList[0]?.content === content)
    .first()
    .value();

  const contentIndex = lodash.findIndex(newList, categoryContent) + 1;

  const nextState = produce(state, (draftState: any) => {
    draftState.categoryList = newList;
    draftState.contentIndex = contentIndex;
  });
  return {
    ...nextState,
  };
};
