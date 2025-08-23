import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetTooltipTitle from 'process/NB/ManualUnderwriting/_hooks/useGetTooltipTitle';
import useRiskIndicatorConfigFilterListByRole from 'process/NB/ManualUnderwriting/_hooks/useRiskIndicatorConfigFilterListByRole';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const riskIndicatorConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.riskIndicatorConfigList,
    shallowEqual
  );
  const riskIndicatorConfigFilterList = useRiskIndicatorConfigFilterListByRole({ id });
  const tagList = useMemo(() => {
    return lodash
      .chain(riskIndicatorConfigFilterList)
      .map((item) => {
        const currentRisk = lodash.find(riskIndicatorConfigList, {riskFactorCode: item.riskFactorCode, clientId: id}) || {};
        const { status = 'N', fecRiskMsg, riskScore }: any = currentRisk;

        return {
          label: formatMessageApi({
            Dropdown_IND_RiskIndicator: item.riskFactorCode,
          }),
          status: status === 'Y' ? 'match' : 'notMatch',
          fecRiskMsg: fecRiskMsg || '',
          riskScore: riskScore || '',
        };
      })
      .value();
  }, [riskIndicatorConfigFilterList, id, riskIndicatorConfigList]);
  return useGetTooltipTitle({ tagList, id });
};
