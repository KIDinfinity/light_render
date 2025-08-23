import {v4 as uuidv4 } from 'uuid';

export default (params) => {
  return {
    nodeId: params.nodeId,
    id: uuidv4(),
    branchNo: '',
    branchName: '',
    branchDescription: '',
    conditionSetId: '',
    conditions: [
      {
        id: uuidv4(),
        conditionId: uuidv4(),
        binded: '0',
        checked: false,
      },
    ],
    binded: '0',
    checked: false,
  };
};
