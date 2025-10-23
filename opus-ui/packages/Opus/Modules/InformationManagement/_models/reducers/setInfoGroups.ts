import lodash from 'lodash';
import { produce } from 'immer';

import { ApplicationType } from 'opus/Enums';

export default (state: any, action: any) => {
  const { groupCodes, informationGroups } = lodash.pick(action.payload, [
    'groupCodes',
    'informationGroups',
    'caseCategory',
    'activityCode',
  ]);
  const nextState = produce(state, (draftState: any) => {
    const activityCategoryList = lodash.get(state, 'activityCategory.activityCategoryList', []);

    if (!lodash.isEmpty(informationGroups) && !lodash.isEmpty(groupCodes)) {
      const sortedGroupCodes = lodash
        .chain(informationGroups)
        .map((group) => lodash.pick(group[0], ['infoGroupCode', 'groupDisplayOrder']))
        .filter((group) => groupCodes.includes(group.infoGroupCode))
        .sortBy((group) => group.groupDisplayOrder)
        .value();

      draftState.groupCodes = sortedGroupCodes;

      const activityCategoryCodes = activityCategoryList.map(
        (category: any) => category.categoryCode
      );

      draftState.informationGroups = lodash.reduce(
        informationGroups,
        (result: any, value: any, key: string) => {
          const selectCaseCategorylist = lodash
            .chain(value)
            .filter((item) => lodash.includes(activityCategoryCodes, item.infoCategoryCode))
            .sortBy((item) => item.infoCategoryDisplayOrder)
            .map((item: any) => {
              const activityItem = lodash.find(activityCategoryList, {
                categoryCode: item.infoCategoryCode,
              });
              return { ...item, applicationType: activityItem?.applicationType };
            })
            .value();

          const caseCategorylist = lodash.sortBy(value, (item) => item.infoCategoryDisplayOrder);
          const editable = lodash.some(
            selectCaseCategorylist,
            (item) =>
              item.applicationType === ApplicationType.both ||
              item.applicationType === ApplicationType.hide
          );
          const isShowDropDown = lodash.some(
            selectCaseCategorylist,
            (item) => item.applicationType === ApplicationType.both
          );

          return {
            ...result,
            [key]: {
              selectCaseCategorylist,
              caseCategorylist,
              editable,
              isShowDropDown,
            },
          };
        },
        {}
      );
    }
  });
  return {
    ...nextState,
  };
};
