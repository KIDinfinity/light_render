

import lodash from 'lodash';

const FormulaList = ['Min', 'Max', 'TaskVolume', 'DailyTaskVolume', 'MonthlyTaskVolume', 'FilterTaskVolumeByTaskBasket', 'Assignee'];

export default (value: string) => {

  if (!lodash.isString(value)) return false;
  return FormulaList.includes(value.substring(0, value.indexOf('(')));

}
