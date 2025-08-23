import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from 'process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/FinancialInfo/FinancialInfo-Field/Section';

export default () => {
  const financialInfoFieldConfig = useGetSectionAtomConfig({
    section: 'FinancialInfo-Field',
    localConfig,
  });
  const incomeTypeVisible = lodash
    .chain(financialInfoFieldConfig)
    .filter((item) => item.field === 'annualIncome' || item.field === 'monthlyIncome')
    .filter((item) => item?.['field-props']?.visible === 'Y')
    .map((item) => item.field)
    .value();

  return useMemo(() => {
    return incomeTypeVisible;
  }, [incomeTypeVisible]);
};
