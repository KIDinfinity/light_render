import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import type { ApplicationType } from '@/utils/constant/information.ts';
import type { ESaveIfNull } from 'bpm/pages/Information/enum/ESaveIfNull';

interface ICategoryConfig {
  activityCode: string;
  activityStatus: string;
  applicationType: ApplicationType;
  placeholder: string;
  taskId: string | null;
  showAddButton: boolean;
  showHistory: number;
  showReadReason: number;
  showReasonDropdown: null | number;
  caseNo: number | null;
  saveIfNull: ESaveIfNull | null;
}

enum CaseCategory {
  BP_NB_CTG001 = 'BP_NB_CTG001',
}

export default ({ item }: any) => {
  const { currentActivity, renewalPayType, caseCategory } = useSelector(
    (state) => ({
      currentActivity: state?.navigatorInformationController?.currentActivity,
      renewalPayType: state.premiumSettlement?.businessData?.policyList?.[0]?.renewalPayType,
      caseCategory: state?.navigatorInformationController?.caseCategory,
    }),
    shallowEqual
  );
  const currentCategory: ICategoryConfig = useMemo(() => {
    const categoryCode = formUtils.queryValue(item?.categoryCode);
    const currentActivityCategory = lodash
      .get(currentActivity, 'activityCategoryList', [])
      .find((activityCategory: any) => activityCategory?.categoryCode === categoryCode);
    const newShowReasonDropdown = (() => {
      const showReasonDropdown = lodash.get(currentActivityCategory, 'showReasonDropdown', 0);
      if (caseCategory === CaseCategory.BP_NB_CTG001 && categoryCode === 'reject') {
        return lodash.includes(['P', 'B'], renewalPayType) ? showReasonDropdown : 0;
      }
      return showReasonDropdown;
    })();
    return { ...currentActivityCategory, showReasonDropdown: newShowReasonDropdown };
  }, [currentActivity, item, renewalPayType, caseCategory]);
  return currentCategory;
};
