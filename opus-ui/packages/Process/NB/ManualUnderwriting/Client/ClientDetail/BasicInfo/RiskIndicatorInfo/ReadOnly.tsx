import React from 'react';
import ReadOnlySection from 'process/NB/ManualUnderwriting/Client/ClientDetail/ReadOnlySection';
import useGetRiskIndicatorConfigList from 'process/NB/ManualUnderwriting/_hooks/useGetRiskIndicatorConfigList';
import useGetRiskIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetRiskIndicator';
import { ReactComponent as WarningIcon } from 'process/assets/warning.svg';

const ReadOnly = ({ expand, id, isSubCard }: any) => {
  useGetRiskIndicator()
  const tagList = useGetRiskIndicatorConfigList({
    id,
  });

  return (
    <ReadOnlySection
      icon={<WarningIcon />}
      expand={expand}
      tagList={tagList}
      id={id}
      isSubCard={isSubCard}
    />
  );
};

export default ReadOnly;
