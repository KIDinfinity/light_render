export default {
  submitRuleSet: {
    ruleSetInfo: {},
    groups: [],
    flowNodeVOs: [],
    branchVOs: [],
  },
  scenarioCurrentTab: 1,

  actionCallBack: {
    onDecisionOk: null,
    onSearchOk: null,
  },
  ruleSetModalData: {},
  currentRuleSetModalTab: '',
  dropDown: {},
  action: null,
  editData: {},
  currentGroupId: null,
  decisionEditData: {},
  currentBranchVOId: null,
  atomInputInfo: [],
  ruleSetInfo: {},
  isAdvanced: false,
  ruleAtomModule: [],
  atomFormulaInfo: {
    fxStatus: 0,
    fxHighLight: 0,
    ruleFormulaVO: {
      formula: null,
      parameter: null,
      editFunction: null,
    },
    ruleFormulaDOList: [],
  },
  formulaInfo: {
    editFunction: '',
    formula: '',
    parameter: {},
  },
  modalOptions: {
    edit: {
      show: false,
      type: '',
    },
    search: {
      show: false,
      type: '',
    },
  },
  searchData: {},
  libraryList: [],
  configData: {
    atomConditionList: [],
    atomResultList: [],
    valueList: [],
  },
  newModalError: [],
  newRulFlow: {
    conditionList: [],
    branchInfo: {},
  },
  advanceModeError: '',
  asyncBusinesssId: '',
  asyncVersionId: '',
};
