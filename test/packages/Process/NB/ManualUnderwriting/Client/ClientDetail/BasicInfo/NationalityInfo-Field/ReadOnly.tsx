import React from 'react';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import { ReactComponent as CountryIcon } from 'process/assets/country.svg';
import useFilterTargetRelationOfInsuredConfig from 'process/NB/ManualUnderwriting/_hooks/useFilterTargetRelationOfInsuredConfig';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';
import useGetAllAddressSubList from 'process/NB/ManualUnderwriting/_hooks/useGetAllAddressSubList';
import useGetAddressCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetAddressCountryDropdown';
import { tenant, Region } from '@/components/Tenant';
import { localConfig } from './Section';
const section = 'NationalityInfo-Field';

const NationalField = ({ expand, id, isSubCard }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const countryDataSource = useGetCountryDropdown();
  const addressCountryDataSource = useGetAddressCountryDropdown();
  const filterSpecialConfig = useFilterTargetRelationOfInsuredConfig({ config, id });
  const allAddressSubList = useGetAllAddressSubList();
  const data = useGetDataBySection({
    section,
    id,
    config: filterSpecialConfig,
    extraDicts: {
      nationality: countryDataSource,
      nationality2: countryDataSource,
      nationality3: countryDataSource,
      countryOfResident: countryDataSource,
      ctfCountryCode: addressCountryDataSource,
      ctfPlace: tenant.region() === Region.PH ? allAddressSubList : countryDataSource,
    },
  });

  return (
    <ReadOnlySection
      data={data}
      icon={<CountryIcon />}
      expand={expand}
      id={id}
      isSubCard={isSubCard}
    />
  );
};

export default ({ expand, id, isSubCard }: any) => {
  return <NationalField expand={expand} id={id} isSubCard={isSubCard} />;
};
