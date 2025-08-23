import {v4 as uuidv4 } from 'uuid';

export default {
  flowNodeVOs: [],
  branchVOs: [],
  groups: [
    {
      conditionParentId: '',
      conditionSetId: '',
      description: '',
      groupConditions: [
        {
          id: uuidv4(),
          atomCode: '',
          atomFlag: '',
          conditionId: '',
          operator: '',
          value: '',
        },
      ],
      groupId: uuidv4(),
      name: '',
      requiedAtoms: [],
      rules: [],
    },
  ],
  ruleSetInfo: {
    description: '',
    effectiveDate: null,
    expectedPublishDate: null,
    expiredDate: null,
    moduleCode: '',
    ruleSetType: '',
    ruleSetId: '',
    ruleSetName: '',
  },
};
