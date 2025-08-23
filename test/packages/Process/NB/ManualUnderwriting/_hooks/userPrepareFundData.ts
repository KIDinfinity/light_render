import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import { formUtils } from 'basic/components/Form';

export default () => {
  const totalFundInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
      shallowEqual
    ) || [];
  const colorConfig = [
    {
      color: '#F3BB90',
      fundCode: 'AAEA',
      fundName: 'FWD Takaful World Islamic Equity Fund',
    },
    {
      color: '#FED141',
      fundCode: 'ACEA',
      fundName: 'FWD Takaful Asia Pacific Islamic Equity Fund',
    },
    {
      color: '#183028',
      fundCode: 'ACFA',
      fundName: 'FWD Takaful Islamic Sukuk Fund',
      labelColor: '#FFFFFF',
    },
    {
      color: '#8B9793',
      fundCode: 'APDA',
      fundName: 'FWD Takaful Dynamic Fund',
    },
    {
      color: '#0097A9',
      fundName: 'FWD Takaful LifeSelect Equity Fund',
      fundCode: 'APEA',
    },
    {
      fundCode: 'APFA',
      fundName: 'FWD Takaful LifeSelect Fixed Income Fund',
      color: '#6ECEB2',
    },
    {
      fundCode: 'AQEA',
      fundName: 'FWD Takaful Global Sustainable Equity Fund',
      color: '#E87722',
    },
    {
      fundCode: 'AQFA',
      fundName: 'FWD Takaful Global Mixed Assets Fund',
      color: '#E2F5F0',
    },
    {
      fundCode: 'ACGA',
      fundName: 'FWD Takaful Lifetime Balanced Fun',
      color: '#FEE8A0',
    },
    {
      fundCode: 'APGA',
      fundName: 'FWD Takaful Global Multi Thematic Fund',
      color: '#DBDFE1',
    }
  ];
  return useMemo(() => {
    return lodash
      .chain(totalFundInfoList)
      .map((fund: any) => {
        const currentConfig = lodash.find(
          colorConfig,
          (colorItem: any) => colorItem.fundCode === formUtils.queryValue(fund.fundCode)
        );
        return {
          ...fund,
          item: fund?.fundCode,
          color: currentConfig?.color,
          value: lodash.toNumber(fund.fundAllocation),
          labelColor: currentConfig?.labelColor,
        };
      })
      .orderBy(['value'], 'desc')
      .value();
  }, [totalFundInfoList, colorConfig]);
};
