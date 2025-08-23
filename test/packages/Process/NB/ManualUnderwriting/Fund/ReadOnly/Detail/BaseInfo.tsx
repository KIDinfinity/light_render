import React from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import { localConfig } from 'process/NB/ManualUnderwriting/Fund/Fund-Field/Section';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import useJudgeULReserveUnitDateDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeULReserveUnitDateDisplay';

export default ({ data }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'Fund-Field',
    localConfig,
  });
  const ulReserveUnitDateFieldVisible = useJudgeULReserveUnitDateDisplay();

  const baseInfoConfig = lodash.filter(config, (item: any) => {
    return ['portfolioId', 'portfolioType', 'ulReserveUnitDate'].includes(item?.field);
  });

  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();

  const configByDisableCondition = baseInfoConfig.map((item) => {
    if (item?.field === 'ulReserveUnitDate' && item?.['field-props']?.visible) {
      item['field-props'].visible = ulReserveUnitDateFieldVisible ? 'Y' : 'N';
    }
    const configItem = getApplicableByDisableCondidtions({
      fieldConfig: item,
      disableFieldsConditions,
      condition: 'mw',
    });
    return configItem;
  });

  return <ConfigurableReadOnlySection config={configByDisableCondition} data={data} />;
};
