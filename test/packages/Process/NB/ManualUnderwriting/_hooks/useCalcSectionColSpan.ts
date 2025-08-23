import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import BooleanEnum from 'basic/enum/BooleanEnum';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useJudgeDisplayFundSection from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFundSection';
import useJudgeDisplayTakeOverSection from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayTakeOverSection';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );

  const loanVisible = lodash.get(businessData, 'policyList[0].loanProtection') === BooleanEnum.Yes;
  const fundVisible = useJudgeDisplayFundSection();
  const takeOverVisivle = useJudgeDisplayTakeOverSection();
  const policyReplacementVisible = true;
  const regionCode = tenant.region();
  const sectionDisplay = {
    loan: loanVisible,
    fund: fundVisible,
    takeOver: takeOverVisivle,
    policyReplacement: policyReplacementVisible,
    voiceRecord: regionCode == Region.VN,
  };

  const sectionVisibleList = Object.keys(
    lodash.pickBy(sectionDisplay, (item: any) => item === true)
  );
  const sectionDisVisibleList = Object.keys(
    lodash.pickBy(sectionDisplay, (item: any) => item === false)
  );

  const sectionColSpan = {};

  lodash.forEach(sectionDisVisibleList, (item: any) => {
    lodash.set(sectionColSpan, item, 0);
  });
  lodash.forEach(sectionVisibleList, (item: any, index: any) => {
    const colSpan =
      index !== sectionVisibleList.length - 1 ? 12 : sectionVisibleList.length % 2 === 0 ? 12 : 24;
    lodash.set(sectionColSpan, item, colSpan);
  });

  return sectionColSpan;
};
