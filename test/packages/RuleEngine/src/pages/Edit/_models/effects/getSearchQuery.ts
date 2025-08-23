import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { queryInternationalisedLibraryRule } from '@/services/ruleEngineRuleLibraryRuleControllerService';
import { queryInternationalisedLibraryCondition } from '@/services/ruleEngineRuleLibraryConditionControllerService';
import { queryInternationalisedLibraryResult } from '@/services/ruleEngineRuleLibraryResultControllerService';
import { queryInternationalisedLibraryBranch } from '@/services/ruleEngineRuleLibraryBranchControllerService';
import { ruleSetQuery } from '@/services/ruleEngineRuleInquiryControllerService';
import { AddType } from '../../Enum';

export default function* (action: any, { select, call, put }: any) {
  const { data } = yield select((state: any) => state.ruleEngineController.searchData);
  const moduleCode = yield select(
    (state: any) => state.ruleEngineController.submitRuleSet?.ruleSetInfo?.moduleCode || ''
  );

  const { activeCode } = action.payload;

  if (!lodash.isEmpty(data) && activeCode) {
    const { params, pagination } = data[activeCode];

    let url = null;
    switch (activeCode) {
      case AddType.Rules:
        url = queryInternationalisedLibraryRule;
        break;
      case AddType.Results:
        url = queryInternationalisedLibraryResult;
        break;
      case AddType.RuleSet:
        url = ruleSetQuery;
        break;
      case AddType.NewRuleSet:
        url = ruleSetQuery;
        break;
      case AddType.RuleSetBranch:
        url = queryInternationalisedLibraryBranch;
        break;
      default:
        url = queryInternationalisedLibraryCondition;
        break;
    }

    const queryResponse: any = yield call(url, {
      ...pagination,
      params: {
        ...params,
        moduleCode: activeCode === AddType.NewRuleSet ? params.moduleCode : formUtils.queryValue(moduleCode),
      },
    });

    if (
      lodash.isPlainObject(queryResponse) &&
      queryResponse.success &&
      !lodash.isEmpty(queryResponse.resultData) &&
      lodash.isArray(queryResponse.resultData.rows)
    ) {
      yield put({
        type: 'updateSearchModal',
        payload: action.payload,
      });
      yield put({
        type: 'saveSearchModalQuery',
        payload: {
          activeCode,
          data: queryResponse.resultData,
        },
      });
    }
  }
}
