import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { Action } from '../Enum';
import getRequired from '../TableRule/Utils/getRequired';

const getExtra = (require, editData, key) => {
  const targetData = editData?.[key];
  const extraData =
    lodash
      .chain(require)
      .filter((el) => !lodash.some(targetData, (item) => item.atomCode === el.atomCode))
      .map((item) => ({
        id: uuidv4(),
        atomCode: item.atomCode,
      })) || [];
  const arrays = [...targetData, ...extraData];
  if (!arrays.length) {
    return [
      {
        id: uuidv4(),
      },
    ];
  }
  return arrays;
};

export default ({ editData, requiredAtoms, action }: any) => {
  const defaultEdit = {
    id: uuidv4(),
    resultSetId: '',
    ruleName: '',
    judgementMethod: '',
    ruleDescription: '',
    conditions: [],
    results: [],
    requiedAtoms: [],
    binded: '0',
  };
  const newData = editData && action === Action.Update ? editData : defaultEdit;
  const { requiredConditions, requiredResults } = getRequired(requiredAtoms);
  const newConditions = getExtra(requiredConditions, newData, 'conditions');
  const newResults = getExtra(requiredResults, newData, 'results');

  return {
    ...newData,
    conditions: editData && action === Action.Update ? newData.conditions || [] : newConditions,
    results: editData && action === Action.Update ? newData.results || [] : newResults,
  };
};
