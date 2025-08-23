import React, { useMemo } from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import { ReactComponent as OtherIcon } from 'process/assets/other.svg';
import { localConfig } from './Section';
import useGetOrderInfoFieldConfigFilterCallback from 'process/NB/ManualUnderwriting/_hooks/useGetOrderInfoFieldConfigFilterCallback';
import useGetLegalRepresentativeOption from 'process/NB/ManualUnderwriting/_hooks/useGetLegalRepresentativeOption';
import useGetOverinsureance from 'process/NB/ManualUnderwriting/_hooks/useGetOverinsureance';
import lodash from 'lodash';

const section = 'OtherInfo-Field';
export default ({ expand, id, isSubCard }: any) => {
  const config = useGetSectionAtomConfig({ section, localConfig });
  const filterByChannel = useGetOrderInfoFieldConfigFilterCallback();
  const legalRepresentativeDicts = useGetLegalRepresentativeOption();
  const useJudgeOverinsuranceFieldsDisplay = useGetOverinsureance(id);

  const data = useGetDataBySection({
    section,
    config: filterByChannel(config),
    id,
    extraDicts: {
      legalRepresentativeUuids: legalRepresentativeDicts,
    },
  });
  const filterData = useMemo(() => {
    return lodash
      .chain(data)
      .filter((item) => {
        if (!useJudgeOverinsuranceFieldsDisplay) {
          return (
            item.key !== 'numberOfPoliciesOrClaimsInOtherComp' &&
            item.key !== 'numberOfOtherCompany'
          );
        }
        return true;
      })
      .value();
  }, [data, useJudgeOverinsuranceFieldsDisplay]);
  return (
    <ReadOnlySection
      data={filterData}
      icon={<OtherIcon />}
      expand={expand}
      id={id}
      isSubCard={isSubCard}
    />
  );
};
