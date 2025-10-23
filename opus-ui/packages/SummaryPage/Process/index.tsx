import React, { lazy, Suspense } from 'react';
import lodash from 'lodash';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import useLoadSummarySectionConfig from 'summary/hooks/useLoadSummarySectionConfig';
import useLoadSectionDataWhenExpand from 'summary/hooks/useLoadSectionDataWhenExpand';
import contentMapping from './contentMapping';

export default ({ children }: any) => {
  const info = useGetCaseDetail();
  const caseCategory = info?.caseCategory;
  const Component = (() => {
    if (lodash.has(contentMapping, caseCategory)) {
      return lodash.get(contentMapping, caseCategory);
    }
    return lazy(() => import('./NotFundPage'));
  })();
  useLoadSummarySectionConfig({
    caseCategory,
  });
  useLoadSectionDataWhenExpand();
  return (
    <Suspense fallback={<></>}>
      {children}
      <Component />
    </Suspense>
  );
};
