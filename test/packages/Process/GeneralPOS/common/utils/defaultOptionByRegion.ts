import { tenant, Region } from '@/components/Tenant';
import { OptionEnum, StateSectionEnum } from 'process/GeneralPOS/common/Enum';

export default (type) => {
  const defaultByType = {
    [StateSectionEnum.PARTIALWITHDRAWALOPTION]: tenant.region({
      [Region.MY]: OptionEnum.Amount,
      [Region.PH]: OptionEnum.Percent,
      [Region.TH]: OptionEnum.Unit,
      notMatch: OptionEnum.Unit,
    }),
    [StateSectionEnum.PARTIALWITHDRAWALLEVEL]: tenant.region({
      [Region.PH]: OptionEnum.PolicyLevel,
      notMatch: OptionEnum.FundLevel,
    }),
    [StateSectionEnum.FUNDSWITCHING]: tenant.region({
      [Region.MY]: OptionEnum.Amount,
      [Region.PH]: OptionEnum.Amount,
      [Region.TH]: OptionEnum.Unit,
      notMatch: OptionEnum.Unit,
    }),
    [StateSectionEnum.PATMENTMETHOD]: tenant.region({
      [Region.MY]: OptionEnum.BTR,
      [Region.PH]: OptionEnum.BTR,
      [Region.TH]: OptionEnum.BTR,
      notMatch: OptionEnum.BTR,
    }),
    [StateSectionEnum.INVESTMENTCONSULTANT]: tenant.region({
      [Region.MY]: OptionEnum.IC,
      [Region.PH]: OptionEnum.IC,
      [Region.TH]: OptionEnum.IC,
      notMatch: OptionEnum.IC,
    }),
  };
  return defaultByType?.[type];
};
