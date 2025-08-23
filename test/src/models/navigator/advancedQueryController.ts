import OrderDirection from '@/components/Hotkey/home/enum/orderDirection';
import bpmCaseLabelService from '@/services/bpmCaseLabelService';
import bpmPendingInformationManagementService from '@/services/bpmPendingInformationManagementService';
import bpmProcessActivityService from '@/services/bpmProcessActivityService';
import mcAdvancedQueryControllerService from '@/services/mcAdvancedQueryControllerService';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import ruleEngineRuleSetDropDownControllerService from '@/services/ruleEngineRuleSetDropDownControllerService';
import { dashboardPageSize } from '@/utils/constant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// import { plainToClassFromExist } from 'class-transformer';
// import { validateSync } from 'class-validator';
import { resRevert } from '@/utils/transform';

import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
// eslint-disable-next-line import/named
import { Mode } from 'navigator/pages/Home/Watching/View/ModePanel/Mode';
import { serialize as objectToFormData } from 'object-to-formdata';

import { history } from 'umi';
import { v5 as uuidv5 } from 'uuid';
import { LS, LSKey } from '@/utils/cache';

const selectableInitState = {
  prev: {
    id: '',
    index: -1,
  },
  current: {
    id: '',
    index: 0,
  },
  next: {
    id: '',
    index: 1,
  },
};
// TODO 匹配对应的请求和响应dto
// import { RulePaginationList, Rule } from '@/../dto/rule.ts';
const stateOfSearchInit = {
  params: {
    // processInstanceId:'',
    // batchNo: '',
    // caseCategory: '',
  },
  orders: {
    // caseNo:{
    //   sortName: '',
    //   sortOrder: '',
    // },
  },
  pagination: {
    currentPage: 1,
    total: 0,
    page: 1,
    pageSize: 10,
  },
  selectable: selectableInitState,
};

export default {
  namespace: 'advancedQueryController',

  state: {
    searchObj: {},
    stateOfSearch: stateOfSearchInit,
    activityKeyList: [],
    caseBusinessTypeList: [],
    taskBusinessTypeList: [],
    businessDecisionList: [],
    caseCurrentActivityList: [],
    taskCurrentActivityList: [],
    claimTypeOptions: [],
    assessmentDecOptions: [],
    dropdownCASFinalStatus: [],
    hosBillingStatus: [],
    sortFromTable: false,
    activePendingItems: [],
    ruleModules: [],
    caseLabels: [],
    tabIndex: '2', // Task
    taskId: '',
    saveStateOfSearch: {},
    transactionTypeList: [],
    submissionChannelList: [],
  },

  effects: {
    *getSubmissionChannelList(_, { call, put }: any) {
      const userInfo = LS.getItem(LSKey.CURRENTUSER);
      const companyCode = userInfo?.companyCode?.[0] || null;
      const response = yield call(
        miscDictionaryControllerService.findPermissionSubmissionChannels,
        { companyCode }
      );
      yield put({
        type: 'saveSubmissionChannelList',
        payload: {
          submissionChannelList: response?.resultData || [],
        },
      });

      return response;
    },

    *enter({ payload }: any, { put }: any) {
      yield put({
        type: 'advancedQueryAllForm/saveCurrentTab',
        payload: {
          currentTab: payload.tabIndex,
        },
      });

      if (!lodash.isEmpty(payload?.stateOfSearch)) {
        yield put({
          type: 'advancedQueryAllForm/saveCurrentSearch',
          payload: {
            searchForm: payload.stateOfSearch,
          },
        });
      }

      // 实际显示还是使用这个tabIndex
      yield put({
        type: 'save',
        payload: {
          tabIndex: payload.tabIndex,
        },
      });

      if (history?.location?.pathname !== '/navigator/advancedquery') {
        history.push('/navigator/advancedquery');
      }
    },

    *advancedQuery({ payload }: any, { call, put }: any) {
      const response = yield call(mcAdvancedQueryControllerService.advancedQuery, payload);
      yield put({
        type: 'save',
        payload: {
          [`advancedQuery_${uuidv5(JSON.stringify(payload), uuidv5.URL)}`]: resRevert(
            response || {}
          ),
          advancedQuery: resRevert(response || {}),
        },
      });

      return response;
    },

    *activityKeyList({ payload }: any, { call, put }: any) {
      const response = yield call(
        miscDictionaryControllerService.findDictionaryByTypeCode,
        payload
      );
      if (response?.success) {
        yield put({
          type: 'saveActivityKeyList',
          payload: {
            activityKeyList: response.resultData,
          },
        });
      }
    },

    *getBusinessTypeList({ payload }: any, { call, put }: any) {
      const { categoryCode, language, regionCode, typeCode, isCase } = payload;
      const response = yield call(
        miscDictionaryControllerService.queryByRegionCodeAndCategory,
        objectToFormData({
          categoryCode,
          language,
          regionCode,
          typeCode,
        })
      );
      if (response?.success) {
        yield put({
          type: 'saveBusinessTypeList',
          payload: {
            businessTypeList: response.resultData,
            isCase,
          },
        });
        return response.resultData;
      }
    },

    *getTransactionTypeList({ payload }: any, { call, put }: any) {
      const { categoryCode, typeCode, language, regionCode } = payload;
      const response = yield call(
        miscDictionaryControllerService.queryByRegionCodeAndCategory,
        objectToFormData({
          categoryCode,
          language,
          regionCode,
          typeCode,
        })
      );

      if (response?.success) {
        yield put({
          type: 'saveTransactionTypeList',
          payload: {
            transactionTypeList: response.resultData,
          },
        });
        return response.resultData;
      }
    },

    *getBusinessDecisionList({ payload }: any, { call, put }: any) {
      const response = yield call(
        miscDictionaryControllerService.queryByRegionCodeAndCategory,
        payload
      );
      if (response?.success) {
        yield put({
          type: 'saveBusinessDecisionList',
          payload: {
            businessDecisionList: response.resultData,
          },
        });
      }
    },

    *findActivitiesByCaseCategory({ payload }: any, { call, put }: any) {
      const { caseCategory, isCase } = payload;
      const response = yield call(
        bpmProcessActivityService.findActivitiesByCaseCategory,
        objectToFormData({ caseCategory })
      );
      if (response?.success) {
        yield put({
          type: 'saveCurrentActivityList',
          payload: {
            currentStatusList: response.resultData,
            isCase,
            caseCategory,
          },
        });

        return response.resultData;
      }
    },

    *getActivePendingItems({ payload }: any, { call, put }: any) {
      const response = yield call(bpmPendingInformationManagementService.getPendReason, payload);
      if (response?.success) {
        yield put({
          type: 'saveActivePendingItems',
          payload: {
            activePendingItems: response.resultData,
          },
        });
      }
    },

    *getRuleModules({ payload }: any, { call, put }: any) {
      const response = yield call(
        ruleEngineRuleSetDropDownControllerService.findRuleSetDropDown,
        payload
      );
      if (response.success) {
        yield put({
          type: 'saveRuleModules',
          payload: {
            ruleModules: response.resultData?.ruleModules || [],
          },
        });
      }
    },

    *getApplicableLabelCodes(_: any, { call, put }: any) {
      const response = yield call(bpmCaseLabelService.getApplicableLabelCodes);

      if (response.success) {
        yield put({
          type: 'saveCaseLabel',
          payload: {
            caseLabels: response.resultData || [],
          },
        });
      }
    },

    *findDictionaryClaimByTypeCode(_: any, { call, put }: any) {
      const response = yield call(
        miscDictionaryControllerService.findDictionaryByTypeCode,
        objectToFormData({
          typeCode: 'ClaimType',
        })
      );
      const claimTypeOptions = lodash.get(response, 'resultData', []);
      yield put({
        type: 'setClaimType',
        payload: {
          claimTypeOptions,
        },
      });
    },

    *findDictionaryFinalStatus(_: any, { call, put }: any) {
      const response = yield call(
        miscDictionaryControllerService.findDictionaryByTypeCode,
        objectToFormData({
          typeCode: 'Dropdown_CAS_FinalStatus',
        })
      );
      const dropdownCASFinalStatus = lodash.get(response, 'resultData', []);
      yield put({
        type: 'setDropdownCASFinalStatus',
        payload: {
          dropdownCASFinalStatus,
        },
      });
    },

    *findDictionaryHospitalBilingByTypeCode({ payload }: any, { call, put }: any) {
      const response = yield call(
        miscDictionaryControllerService.findDictionaryByTypeCode,
        payload
      );
      if (response.success) {
        yield put({
          type: 'setStatuesType',
          payload: {
            hosBillingStatus: response.resultData,
          },
        });
      }
    },

    *findDictionaryAssessmentByTypeCode(_: any, { call, put }: any) {
      const response = yield call(
        miscDictionaryControllerService.findDictionaryByTypeCode,
        objectToFormData({
          typeCode: 'Dropdown_CLM_AssessmentDecision',
        })
      );
      const assessmentDecOptions = lodash.get(response, 'resultData', []);
      yield put({
        type: 'setAssessmentDec',
        payload: {
          assessmentDecOptions,
        },
      });
    },

    *saveStateOfSearchA({ payload }: any, { select, put }: any) {
      const loading = yield select((state: any) => state.loading.effects['task/tableList']);
      if (loading) {
        return;
      }
      const mode = yield select((state: any) => state.navigatorHomeWatching.mode);
      if (mode !== Mode.Table) {
        return;
      }

      const list = yield select((state: any) => state.task.tableList.list);
      const totalPage = yield select((state: any) => state.task.tableList?.pagination.totalPage);
      const pageSize = yield select((state: any) => state.task.tableList?.pagination.pageSize);
      const stateOfSearch = yield select(
        (state: any) => state.advancedQueryController.stateOfSearch
      );

      const { selectable, pagination } = stateOfSearch;
      const { prev, current, next } = selectable;
      // const { total, pageSize, currentPage } = pagination;

      const { direction } = payload;

      // 默认标识第一条
      let selectedRowIndex = current.index || 1;
      if (current.id) {
        const prevExist = list.some((item: any) => item.taskId === prev.id);
        // const currentExist = list.some(item => item.taskId === current.id);
        const nextExist = list.some((item: any) => item.taskId === next.id);

        if (direction === OrderDirection.Next) {
          if (nextExist) {
            selectedRowIndex = lodash.findIndex(list, ['taskId', next.id]);
          } else {
            if (lodash.get(pagination, 'currentPage') === totalPage) return;

            // 最后一条重新请求接口(TODO:这里需要优化)
            const userId = yield select((state: any) => state.user.currentUser.userId);
            const filter = yield select((state: any) => state.homeList.filter);

            const options = {
              pageSize: pageSize || dashboardPageSize,
              currentPage: lodash.get(pagination, 'currentPage') + 1,
              params: {
                taskStatus: filter,
                assignee: userId,
              },
            };
            yield put({
              type: 'saveStateOfSearchReducer',
              payload: {
                selectable: {
                  prev: {
                    id: '',
                    index: -1,
                  },
                  current: {
                    id: '',
                    index: 0,
                  },
                  next: {
                    id: '',
                    index: 1,
                  },
                },
              },
            });
            yield put({
              type: 'saveStateOfSearchPagination',
              payload: {
                direction: OrderDirection.Next,
                totalPage,
              },
            });

            yield put({
              type: 'task/tableList',
              payload: {
                ...options,
              },
            });

            return;
          }
        } else if (direction === OrderDirection.Prev) {
          if (prevExist) {
            selectedRowIndex = lodash.findIndex(list, ['taskId', prev.id]);
          }
        } else {
          // throw 'direction needed';
        }
      }

      if (list) {
        if (list[selectedRowIndex - 1]) {
          lodash.set(selectable, 'prev.id', list[selectedRowIndex - 1].taskId);
          lodash.set(selectable, 'prev.index', selectedRowIndex - 1);
        } else {
          lodash.set(selectable, 'prev.id', null);
          lodash.set(selectable, 'prev.index', null);
        }
        if (list[selectedRowIndex]) {
          lodash.set(selectable, 'current.id', list[selectedRowIndex].taskId);
          lodash.set(selectable, 'current.index', selectedRowIndex);
        }
        if (list[selectedRowIndex + 1]) {
          lodash.set(selectable, 'next.id', list[selectedRowIndex + 1].taskId);
          lodash.set(selectable, 'next.index', selectedRowIndex + 1);
        } else {
          lodash.set(selectable, 'next.id', null);
          lodash.set(selectable, 'next.index', null);
        }
      }

      yield put({
        type: 'saveStateOfSearchReducer',
        payload: {
          selectable,
        },
      });
    },
  },

  reducers: {
    // 这里大量采用了创建新对象的方式，实际上没有用到immer的功能
    // 虽然采用immer写法会更加清晰简洁，但这次性能优化改动比较大时间也紧，为了避免增加过多复杂性沿用了原来的方式，而且两者在性能上无显著区别，旧写法会导致根节点引用变化
    // 稍微想了下，部分selector会直接读根节点的，有空还是改了吧。
    save(state: any, action: any) {
      // 仅在controller内部调用，未做优化
      return {
        ...state,
        ...action.payload,
      };
    },
    resetSelectable(state: any) {
      return {
        ...state,
        selectable: selectableInitState,
        stateOfSearch: {
          ...state.stateOfSearch,
          selectable: selectableInitState,
        },
      };
    },
    saveSortFromTable(state: any, { payload }: any) {
      const { sortFromTable } = payload;
      if (lodash.isEqual(sortFromTable, state.sortFromTable)) return state;
      return {
        ...state,
        sortFromTable,
      };
    },

    saveStateOfSearch(state: any, { payload }: any) {
      const { stateOfSearch } = payload;
      if (lodash.isEqual(stateOfSearch, state.stateOfSearch)) return state;
      return {
        ...state,
        stateOfSearch: { ...state.stateOfSearch, ...stateOfSearch },
      };
    },

    saveStateOfSearchReducer(state: any, { payload }: any) {
      const {
        stateOfSearch: { selectable: oldSelectable },
      } = state;
      const { selectable } = payload;
      if (lodash.isEqual(selectable, oldSelectable)) return state;
      state.stateOfSearch.selectable = selectable;
      return state;
    },

    saveStateOfSearchPagination(state: any, { payload }: any) {
      const { stateOfSearch: oldStateOfSearch } = state;
      const { direction, totalPage } = payload;
      const prevPage = oldStateOfSearch.pagination.currentPage - 1;
      const nextPage = oldStateOfSearch.pagination.currentPage + 1;
      if (direction === OrderDirection.Next) {
        if (nextPage > totalPage) return state;
      } else if (prevPage < 1) {
        return state;
      }
      const pagination = state.stateOfSearch.pagination;
      pagination.page = direction === OrderDirection.Next ? nextPage : prevPage;
      pagination.currentPage = direction === OrderDirection.Next ? nextPage : prevPage;

      return state;
    },

    initStateOfSearch(state: any) {
      if (lodash.isEqual(state.stateOfSearch, stateOfSearchInit)) {
        return state;
      }

      return {
        ...state,
        stateOfSearch: stateOfSearchInit,
      };
    },

    saveSearchObj(state: any, { payload }: any) {
      const { searchObj } = payload;
      if (lodash.isEqual(searchObj, state.searchObj)) return state;

      return {
        ...state,
        searchObj: {
          ...state.searchObj,
          ...searchObj,
        },
      };
    },

    initSearchObj(state: any) {
      const hasRedundantKey = Object.keys(state.searchObj || {}).some(
        (key) => key !== 'tabIndex' && key !== 'mode'
      );
      if (!hasRedundantKey) return state;

      const { tabIndex, mode } = state.searchObj;
      return {
        ...state,
        searchObj: { tabIndex, mode },
      };
    },

    saveActivityKeyList(state: any, { payload }: any) {
      const { activityKeyList } = payload;
      if (lodash.isEqual(activityKeyList, state.activityKeyList)) return state;
      return {
        ...state,
        activityKeyList,
      };
    },

    saveTransactionTypeList(state: any, { payload }: any) {
      const { transactionTypeList } = payload;
      if (lodash.isEqual(transactionTypeList, state.transactionTypeList)) return state;
      return {
        ...state,
        transactionTypeList: transactionTypeList,
      };
    },

    saveBusinessTypeList(state: any, { payload }: any) {
      const { businessTypeList, isCase } = payload;
      if (isCase) {
        if (shallowEqual(businessTypeList, state.caseBusinessTypeList)) return state;
        return {
          ...state,
          caseBusinessTypeList: businessTypeList,
        };
      } else {
        if (shallowEqual(businessTypeList, state.taskBusinessTypeList)) return state;
        return {
          ...state,
          taskBusinessTypeList: businessTypeList,
        };
      }
    },

    saveBusinessDecisionList(state: any, { payload }: any) {
      const { businessDecisionList } = payload;
      if (shallowEqual(businessDecisionList, state.businessDecisionList)) return state;
      return {
        ...state,
        businessDecisionList,
      };
    },

    saveCurrentActivityList(state: any, { payload }: any) {
      const { currentStatusList = [], isCase, caseCategory } = payload;
      const currentActivityList: any = currentStatusList.map((item) => {
        return {
          autoActivity: item?.autoActivity,
          dictCode: item?.processActivityKey,
          dictName: formatMessageApi({ activity: item?.processActivityKey, caseCategory }),
        };
      });
      if (isCase) {
        if (lodash.isEqual(currentActivityList, state.caseCurrentActivityList)) return state;
        return {
          ...state,
          caseCurrentActivityList: currentActivityList,
        };
      } else {
        if (lodash.isEqual(currentActivityList, state.taskCurrentActivityList)) return state;
        return {
          ...state,
          taskCurrentActivityList: currentActivityList,
        };
      }
    },

    saveActivePendingItems(state: any, { payload }: any) {
      const { activePendingItems } = payload;
      if (shallowEqual(activePendingItems, state.activePendingItems)) return state;
      return {
        ...state,
        activePendingItems,
      };
    },

    saveRuleModules(state: any, { payload }: any) {
      const { ruleModules } = payload;
      if (lodash.isEqual(ruleModules, state.ruleModules)) return state;
      return {
        ...state,
        ruleModules,
      };
    },

    saveCaseLabel(state: any, { payload }: any) {
      const { caseLabels } = payload;

      if (lodash.isEqual(caseLabels, state.caseLabels)) return state;

      return {
        ...state,
        caseLabels,
      };
    },

    setClaimType(state: any, action: any) {
      const claimTypeOptions = lodash.get(action, 'payload.claimTypeOptions', []);
      if (lodash.isEqual(claimTypeOptions, state.claimTypeOptions)) return state;
      return {
        ...state,
        claimTypeOptions,
      };
    },

    setDropdownCASFinalStatus(state: any, action: any) {
      const dropdownCASFinalStatus = lodash.get(action, 'payload.dropdownCASFinalStatus', []);
      if (lodash.isEqual(dropdownCASFinalStatus, state.dropdownCASFinalStatus)) return state;
      return {
        ...state,
        dropdownCASFinalStatus,
      };
    },

    setStatuesType(state: any, { payload }: any) {
      const { hosBillingStatus } = payload;
      if (lodash.isEqual(hosBillingStatus, state.hosBillingStatus)) return state;
      return {
        ...state,
        hosBillingStatus,
      };
    },

    setAssessmentDec(state: any, action: any) {
      const assessmentDecOptions = lodash.get(action, 'payload.assessmentDecOptions', []);
      if (lodash.isEqual(assessmentDecOptions, state.assessmentDecOptions)) return state;
      return {
        ...state,
        assessmentDecOptions,
      };
    },

    saveTaskId(state: any, { payload }: any) {
      const { taskId } = payload;
      state.taskId = taskId;
      return state;
    },

    saveSubmissionChannelList(state: any, { payload }: any) {
      const { submissionChannelList } = payload;
      state.submissionChannelList = submissionChannelList;
      return state;
    },
  },
};
