import React, { useMemo } from 'react';

import PolicyReplacementInfo from './PolicyReplacementInfo';
import PolicyReplacementTable from './PolicyReplacementTable';
import GIOStatement from './GIOStatement';

interface IProps {
  replacementFirstInfo: any;
  replacementLastInfo: any;
  replacementInfoList?: any[];
  showGIOStatement?: boolean;
  showTable?: boolean;
}
export default ({
  replacementFirstInfo,
  replacementLastInfo,
  replacementInfoList,
  showGIOStatement = false,
  showTable = false,
}: IProps) => {
  const statement = useMemo(() => replacementInfoList?.[0]?.statement, [replacementInfoList]);
  return (
    <>
      <PolicyReplacementInfo part="first" data={replacementFirstInfo} />
      {showTable && <PolicyReplacementTable data={replacementInfoList} />}
      <PolicyReplacementInfo part="last" data={replacementLastInfo} />
      {showGIOStatement && <GIOStatement statement={statement} />}
    </>
  );
};
