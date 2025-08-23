import { FormType as FormTypeEnum } from '../Enum';
const formulaArr = ['Min', 'Min', 'TaskVolume', 'DailyTaskVolume', 'Assignee'];

// 这个文件暂时没有用到，应该删除

export default ({ value, type }: string) => {
  const formula = value.substring(0, value.indexOf('('));
  if (type !== FormTypeEnum.Text || !formulaArr.includes(formula)) return {};

  const valuesArr = value.substring(value.indexOf('(') + 1, value.length - 1).split(',');

  return {
    formula: `Formulas.${formula}`,
    parameter: {
      collectAtom: '',
      returnValue: valuesArr[0],
      compareValue: valuesArr[1],
    },
  }
}