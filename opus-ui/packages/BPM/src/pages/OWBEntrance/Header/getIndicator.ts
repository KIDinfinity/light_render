import navigatorLabelService from '@/services/navigatorLabelService';

export default async ({ caseNo, setIndicator }: any) => {
  let indicatorData = {};
  const res = await navigatorLabelService.getLabelByBusinessNo([caseNo]);
  if (res?.success) {
    indicatorData = { caseLabelList: res?.resultData?.[0]?.caseLabelList || [] };
  }
  setIndicator(indicatorData);
};
