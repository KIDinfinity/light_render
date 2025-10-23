import { produce } from 'immer';
import lodash from 'lodash';
import InitState from '../state';

export default {
  saveSearched: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.searched = action.payload;
    });
    return { ...nextState };
  },
  saveTaskData: (state: any, action: any) => {
    const { current, total, list } = action.payload;

    const nextState = produce(state, (draftState: any) => {
      draftState.taskData = {
        ...draftState.taskData,
        total: lodash.isNumber(Number(total)) ? total : 0,
        list: Array.isArray(list) ? list : [],
        current,
      };
    });
    return { ...nextState };
  },
  saveShowFilter: (state: any, action: any) => {
    const { showFilter } = action.payload;

    const nextState = produce(state, (draftState: any) => {
      draftState.taskData.showFilter = showFilter;
    });
    return { ...nextState };
  },
  saveFilterDatas: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.taskData.filterDatas = {
        ...draftState.taskData.filterDatas,
        ...action.payload,
      };
    });
    return { ...nextState };
  },
  saveFilterChoice: (state: any, { payload }: any) => {
    const { filterChoice } = payload || {};
    const nextState = produce(state, (draftState: any) => {
      draftState.taskData.filterChoice = filterChoice;
    });
    return { ...nextState };
  },
  saveSearchObj: (state: any, action: any) => {
    const { searchNoObj } = action.payload;

    const nextState = produce(state, (draftState: any) => {
      draftState.searchNoObj = searchNoObj;
    });
    return { ...nextState };
  },

  saveResetData: (state: any) => {
    return {
      ...state,
      ...InitState,
    };
  },
  saveSortedInfoForApply: (state: any, { payload }: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.sorterParamsForfilterChoice = {
        ...payload,
      };
    });
    return { ...nextState };
  },
};
