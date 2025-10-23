import { produce } from 'immer';

/**
 *
 * @param 清除
 */
export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.collapseActiveKey = ['AddInformationList'];
    draftState.allCategoryHistory = [];
    draftState.auditList = [];
    draftState.addInformations = [];
    draftState.informationData = {};
    draftState.categoryList = [];
  });
  return {
    ...nextState,
  };
};
