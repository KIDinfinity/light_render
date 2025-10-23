import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const { dashboardCode, fieldName } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.chartListMap[dashboardCode].dashboardSearchFieldList = lodash.map(
      draftState?.chartListMap[dashboardCode]?.dashboardSearchFieldList,
      (item: any) => ({
        ...item,
        visible: item.fieldName === fieldName ? !item.visible : item.visible,
      })
    );
  });
  return { ...nextState };
};
