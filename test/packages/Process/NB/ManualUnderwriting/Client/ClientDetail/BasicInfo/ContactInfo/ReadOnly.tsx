import React from 'react';
import ReadOnlyContactTable from './ContactInfo-Table/ReadOnlyContactTable';
import ReadOnlyContactField from './ContactInfo-Field/ReadOnly';
import useJudgeEvevryFieldsDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';

export default ({ expand, id, isSubCard }: any) => {
  const isDiplayAll = useJudgeEvevryFieldsDisplay({ id });
  return (
    <>
      <ReadOnlyContactField expand={expand} id={id} isSubCard={isSubCard} />
      {(expand || isDiplayAll) && <ReadOnlyContactTable id={id} isSubCard={isSubCard} />}
    </>
  );
};
