import { produce } from 'immer';
import lodash from 'lodash';
import InitState from '../state';

import { getActivityList } from 'opus/Utils';

export default {
  saveTaskData: (state: any, action: any) => {
    const { total, list, current, type } = action.payload;
    const nextState = produce(state, (draftState: any) => {
      draftState[type] = {
        ...draftState[type],
        total: lodash.isNumber(Number(total)) ? total : 0,
        list: Array.isArray(list) ? list : [],
        current,
      };
    });
    return { ...nextState };
  },
  saveResetData: (state: any) => {
    return {
      ...state,
      ...InitState,
    };
  },
  saveOrganizationCode: (state: any, { payload }: any) => {
    const { organizationCode, organizationList } = payload || {};

    const { activityList, owner } = getActivityList({
      organizationCode,
      organizationList,
    });
    return {
      ...state,
      organizationCode,
      owner,
      activityList,
    };
  },
  saveFiltershow: (state: any, { payload }: any) => {
    const { showFilter } = payload || {};
    return {
      ...state,
      showFilter,
    };
  },

  saveFilterDatas: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      const { categoryCode, ...filterDatas } = action.payload || {};

      if (!categoryCode) return;

      draftState[categoryCode].filterDatas = {
        ...draftState[categoryCode].filterDatas,
        ...(filterDatas || {}),
      };
    });
    return { ...nextState };
  },
  saveFilterChoiceUpdate: (state: any, { payload }: any) => {
    const { filterChoice, categoryCode } = payload || {};

    const nextState = produce(state, (draftState: any) => {
      draftState[categoryCode].filterChoice = filterChoice;
    });
    return { ...nextState };
  },
  saveFilterChoiceClear: (state: any, { payload }: any) => {
    const { categoryCode } = payload || {};
    const nextState = produce(state, (draftState: any) => {
      draftState[categoryCode].filterChoice = {};
    });
    return { ...nextState };
  },
  saveLoading: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.loading = action.payload;
    });

    return {
      ...nextState,
    };
  },
  saveConfigurationItem: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.configurationItem = action.payload;
    });
    return { ...nextState };
  },
  saveTaskDataClear: (state: any, action: any) => {
    const nextState = produce(state, (draftState: any) => {
      draftState.taskData = InitState;
    });
    return { ...nextState };
  },
  saveIncompletedCases: (state: any, action: any) => {
    const { incompleteCases } = action.payload;
    const nextState = produce(state, (draftState: any) => {
      draftState.incompleteCases = { ...draftState.incompleteCases, ...incompleteCases };
    });
    return { ...nextState };
  },
  saveIncompletedFilterChoiceUpdate: (state: any, { payload }: any) => {
    const { fieldName, filterChoice } = payload || {};

    const nextState = produce(state, (draftState: any) => {
      draftState.incompleteCases.filterChoice = lodash.isEmpty(filterChoice)
        ? lodash.omit(draftState.filterChoice, fieldName)
        : {
            ...draftState.incompleteCases.filterChoice,
            [fieldName]: filterChoice,
          };
    });
    return { ...nextState };
  },
  saveIncompletedFilterChoiceClear: (state: any, { payload }: any) => {
    const { fieldName } = payload || {};
    const nextState = produce(state, (draftState: any) => {
      draftState.incompleteCases.filterChoice = !fieldName
        ? {}
        : {
            ...draftState.incompleteCases.filterChoice,
            [fieldName]: [],
          };
    });
    return { ...nextState };
  },
};
