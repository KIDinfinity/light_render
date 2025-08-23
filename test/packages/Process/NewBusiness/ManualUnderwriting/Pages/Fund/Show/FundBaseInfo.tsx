import React from 'react';

import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';

import { useUlReserveUnitDateDisplay } from '../hooks';
import { localConfig } from '../_config/FundField';
import useGetSectionConfigWithCondition from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithCondition';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ fundInfo }: { fundInfo: any }) => {
  // 判断是否显示ulReserveUnitDate
  const ulReserveUnitDateFieldVisible = useUlReserveUnitDateDisplay();
  let sectionConfig = useGetSectionConfigWithCondition({
    section: 'Fund-Field',
    localConfig,
  });
  sectionConfig = sectionConfig?.filter((item: any) => {
    const fieldList = ['portfolioId', 'portfolioType'];
    if (ulReserveUnitDateFieldVisible) {
      fieldList.push('urReserveUnitDate');
    }
    return fieldList.includes(item?.field);
  });

  return (
    <ConfigurableReadOnlySection
      config={sectionConfig}
      data={formUtils.objectQueryValue(fundInfo)}
      NAMESPACE={NAMESPACE}
    />
  );
};
