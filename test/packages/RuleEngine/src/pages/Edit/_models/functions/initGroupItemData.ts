import {v4 as uuidv4 } from 'uuid';

export const getGroupData = () => ({
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
});
