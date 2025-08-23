import React from 'react';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import useFormatContratInfo from 'process/NB/ManualUnderwriting/_hooks/useFormatContratInfo';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './Section';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';

const section = 'ContactInfo-Field';

export default ({ expand, id }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const countryDataSource = useGetCountryDropdown();
  const data = useGetDataBySection({
    section,
    id,
    config,
    extraDicts: {
      fullAddress: countryDataSource,
    },
  });
  const formatData = useFormatContratInfo({ data, id });
  return <ReadOnlySection data={formatData} icon="contacts" expand={expand} id={id} />;
};
