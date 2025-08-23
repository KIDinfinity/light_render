import { produce }  from 'immer';

const getData = (params: any) => {
  return {
    params,
    pagination: {
      current: 1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPage: 0,
    },
    list: [],
    selectedRowKeys: [],
  };
};

const saveSearchModel = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.searchData = {
      action: '',
      activeCode: '',
      data: {
        rules: getData({
          basicRuleId: '',
          ruleName: '',
          ruleDescription: '',
          condition: '',
          rusult: '',
        }),
        conditions: getData({
          conditionName: '',
          conditionContent: '',
        }),
        results: getData({
          resultName: '',
          resultContent: '',
        }),
        ruleSet: getData({
          ruleSetName: '',
          description: '',
        }),
        newRuleSet: getData({
          ruleSetName: '',
          moduleCode: '',
          type: '',
          creator: '',
          gmtCreate: '',
        }),
        ruleSetBranch: getData({
          branchName: '',
          branchContent: '',
          branchDescription: '',
        }),
        ruleSetConditions: getData({
          conditionName: '',
          conditionContent: '',
        }),
      },
    };
  });

  return { ...nextState };
};

export default saveSearchModel;
