import lodash from 'lodash';

interface IAction {
  payload: {
    caseCategory: string;
    caseCategoryReasonConfigs: any[];
  };
}

export default function saveCaseCategoryReasonDocConfigs(state: any, { payload }: IAction) {
  const { caseCategory, caseCategoryReasonConfigs } = payload;

  let reasonConfigsArr: any[] = [];
  lodash.forEach(caseCategoryReasonConfigs, (item: any) => reasonConfigsArr.push(...item.reasonConfigs));
  reasonConfigsArr = lodash.uniqBy(reasonConfigsArr, 'reasonCode')
  const docConfigsObj = {};
  lodash.forEach(reasonConfigsArr, (config: any) => {
    const { reasonCode, docConfigs } = config;
    if (!docConfigsObj[reasonCode]) {
      docConfigsObj[reasonCode] = docConfigs;
    }
  })

  return {
    ...state,
    caseCategoryReasonDocConfigs: {
      [caseCategory]: docConfigsObj,
    }
  };
}
