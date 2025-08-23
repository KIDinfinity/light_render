import lodash from 'lodash';
import { getLibraryRule } from '@/services/ruleEngineRuleLibraryRuleControllerService';
import { getLibraryCondition } from '@/services/ruleEngineRuleLibraryConditionControllerService';
import { getLibraryResult } from '@/services/ruleEngineRuleLibraryResultControllerService';
import { getLibraryBranch } from '@/services/ruleEngineRuleLibraryBranchControllerService';
import { AddType } from '../../Enum';
import getTypeKey from '../../Utils/getTypeKey';

export default function* (action: any, { select, call, put }: any) {
  const { searchData, currentGroupId, submitRuleSet, decisionEditData } = yield select(
    (state: any) => state.ruleEngineController
  );
  const { activeCode, data } = searchData;

  const { list, selectedRowKeys } = data[activeCode];

  const newList = lodash.filter(list, (item: any) =>
    selectedRowKeys.includes(item[getTypeKey(activeCode)])
  );

  let url = null;
  let params = [];

  switch (activeCode) {
    case AddType.Rules:
      params = lodash.map(newList, (newItem: any) => newItem.ruleRecordId);
      url = getLibraryRule;
      break;
    case AddType.Results:
      params = lodash.map(newList, (newItem: any) => newItem.resultRecordId);
      url = getLibraryResult;
      break;
    case AddType.RuleSetBranch:
      params = lodash.map(newList, (newItem: any) => newItem.conditionSetRecordId);
      url = getLibraryBranch;
      break;
    default:
      params = lodash.map(newList, (newItem: any) => newItem.conditionRecordId);
      url = getLibraryCondition;
      break;
  }
  const libraryResponse: any = yield call(url, params);

  if (
    lodash.isPlainObject(libraryResponse) &&
    libraryResponse.success &&
    lodash.isArray(libraryResponse.resultData)
  ) {
    const newlistResponse = lodash.map(libraryResponse.resultData, (item: any) => {
      return { ...item, binded: '1' };
    });

    switch (activeCode) {
      case AddType.Rules:
        // eslint-disable-next-line no-case-declarations
        const newGroups = lodash.map(submitRuleSet.groups, (groupItem: any) => {
          const rulesList = groupItem.rules || [];
          return groupItem.groupId === currentGroupId
            ? {
                ...groupItem,
                rules: lodash.concat(rulesList, newlistResponse),
              }
            : groupItem;
        });
        yield put({
          type: 'saveSubmitRuleSet',
          payload: {
            submitRuleSet: {
              ruleSetInfo: submitRuleSet.ruleSetInfo,
              groups: newGroups,
            },
          },
        });
        break;

      case AddType.RuleSetConditions:
        yield put({
          type: 'addDecisionCondition',
          payload: {
            newList: newlistResponse,
            id: currentGroupId,
          },
        });
        break;

      case AddType.RuleSetBranch:
        // eslint-disable-next-line no-case-declarations
        const newDecisionEditData = {
          ...decisionEditData,
          branchVO: {
            ...decisionEditData.branchVO,
            branchList: [...decisionEditData.branchVO.branchList, ...newlistResponse],
          },
        };
        yield put({
          type: 'saveDecisionData',
          payload: {
            decisionEditData: newDecisionEditData,
          },
        });

        break;

      default:
        yield put({
          type: 'addLibrary',
          payload: {
            list: newlistResponse,
          },
        });
        break;
    }

    yield put({
      type: 'updateModalStatus',
      payload: {
        isSearch: false,
      },
    });
  }
}
