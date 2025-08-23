import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { conditionId, changedFields, atomName, editFunction } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const index = lodash.findIndex(
      draftState.editData.conditions,
      (item) => item.id === conditionId
    );

    if (index !== -1) {
      const condition = draftState.editData.conditions[index];

      // 如果没有fx: condition.atomName
      // 如果有fx: 1、condition.atomName 2、condition.formulaInfo { formula: '', parameter: {} }

      if (!condition.formulaInfo) {
        condition.formulaInfo = {
          editFunction,
          parameter: {},
        };
      }

      if (lodash.has(changedFields, 'formula')) {
        // 处理初始化数据
        if (lodash.isEmpty(condition.formulaInfo.parameter)) {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { locale_new } = changedFields.formula;
          const newsArr = locale_new
            .substring(locale_new.indexOf('(') + 1, locale_new.length - 1)
            .split(',');
          const parameter = {};
          lodash.map(newsArr, (item: any, index: number): void => {
            if (index === 0) {
              parameter[`${item}`] = atomName;
            } else {
              parameter[`${item}`] = '';
            }
          });
          condition.formulaInfo.parameter = parameter;
        }
        condition.formulaInfo.formula = changedFields.formula;
      } else {
        const key = Object.keys(changedFields)[0];
        const value = Object.values(changedFields)[0];

        condition.formulaInfo.parameter[key] = value;
      }
    }
  });

  return { ...nextState };
};
