import { useMemo } from 'react';
import lodash from 'lodash';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default ({ dictTypeCode }: any) => {
  const dicts = getDrowDownList(dictTypeCode);
  return useMemo(() => {
    const dictList = [
      BenefitLevelDecision.Standard,
      BenefitLevelDecision.Postpone,
      BenefitLevelDecision.Decline,
      BenefitLevelDecision.NonStandard,
    ];
    return lodash
      .chain(dicts)
      .filter((item: any) => {
        return dictList.includes(item?.dictCode);
      })
      .value();
  }, [dicts]);
};
