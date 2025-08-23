import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import useGetPersonalInfoDefaultData from 'process/NB/ManualUnderwriting/_hooks/useGetPersonalInfoDefaultData';
import useFilterTargetRelationOfInsuredConfig from 'process/NB/ManualUnderwriting/_hooks/useFilterTargetRelationOfInsuredConfig';
import useGetVisibleByCtfTypeReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetVisibleByCtfTypeReadOnly';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';
import useGetVisibleByNationalityReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetVisibleByNationalityReadOnly';
import useJudgeByDisplayConfig from 'process/NB/ManualUnderwriting/_hooks/useJudgeByDisplayConfig';

import { localConfig } from './Section';

const section = 'PersonalInfo-Field';
export default ({ expand, id, item, isSubCard }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const filterSpecialConfig = useFilterTargetRelationOfInsuredConfig({ config, id });
  let filterConfig = useGetVisibleByCtfTypeReadOnly({ config: filterSpecialConfig, id });
  filterConfig = useGetVisibleByNationalityReadOnly({ config: filterSpecialConfig, id });
  filterConfig = useJudgeByDisplayConfig({
    config: filterConfig,
    id,
    valueKey: 'identityType',
    targetKey: 'expiryDate',
  });

  const countryDataSource = useGetCountryDropdown();
  let data = useGetDataBySection({
    section,
    config: filterConfig,
    id,
    extraDicts: {
      ctfPlace: countryDataSource,
    },
  });
  data = useGetPersonalInfoDefaultData({
    data,
    clientInfo: item,
  });
  return (
    <ReadOnlySection
      data={data}
      icon="user"
      expand={expand}
      section="PersonalInfo-Field"
      id={id}
      isSubCard={isSubCard}
    />
  );
};
