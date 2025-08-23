import { useMemo } from 'react';
import lodash from 'lodash';
import useGetDecisionColumns from './useGetDecisionColumns';
import { useGetHasFamilyGroupInd } from 'process/NewBusiness/ManualUnderwriting/_hooks';

export default () => {
  const columns = useGetDecisionColumns();
  const hasFamilyGroupInd = useGetHasFamilyGroupInd();

  return useMemo(() => {
    return lodash.filter(columns, (column: any) => {
      if (column.key === 'clientId') {
        return false;
      }
      if (!hasFamilyGroupInd && column.key === 'laSharingGroupNumber') {
        return false;
      }
      if (column.key === 'initialInvestmentAnnualPremium') {
        return false;
      }
      return true;
    });
  }, [columns, hasFamilyGroupInd]);
};
