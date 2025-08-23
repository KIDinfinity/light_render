import lodash from 'lodash';

interface IAction {
  payload: {
    caseCategory: string;
    caseCategoryReasonConfigs: any[];
  };
}

export default function saveCaseCategoryReasonConfigs (state: any, { payload }: IAction) {
  const { caseCategory, caseCategoryReasonConfigs } = payload;

  const reasonConfigsArr: any[] = [];
  lodash.forEach(caseCategoryReasonConfigs, (item: any) => reasonConfigsArr.push(...item.reasonConfigs));

  return {
    ...state,
    caseCategoryReasonConfigs: {
      [caseCategory]: lodash.uniqBy(reasonConfigsArr, 'reasonCode'),
    },
  };
}
