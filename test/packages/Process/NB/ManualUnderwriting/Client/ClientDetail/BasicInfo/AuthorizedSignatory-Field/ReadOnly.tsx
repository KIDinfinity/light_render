import React from 'react';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import { ReactComponent as CountryIcon } from 'process/assets/country.svg';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './Section';

const section = 'Authorized signatory-Field';

export default ({ expand, id, isSubCard }: any) => {
  const config = useGetSectionAtomConfig({ localConfig, section });
  const data = useGetDataBySection({
    section,
    id,
    config,
  });

  return <ReadOnlySection data={data} icon={<CountryIcon />} expand={expand} id={id} isSubCard={isSubCard} />;
};
