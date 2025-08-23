import React from 'react';
import useJudgeSectionDisplay from 'summary/hooks/useJudgeSectionDisplay';
import useGetSectionOrder from 'summary/hooks/useGetSectionOrder';

export default ({ children, section }: any) => {
  const isDisplay = useJudgeSectionDisplay({ section });
  const order = useGetSectionOrder({ section });
  return <>{isDisplay && React.cloneElement(children, { style: { order } })}</>;
};
