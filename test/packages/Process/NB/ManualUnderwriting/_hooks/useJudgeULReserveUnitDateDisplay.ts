import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import CaseCategory from 'enum/CaseCategory';

export default () => {
  const regionCode = tenant.region();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const caseCategory = lodash.get(taskDetail, 'caseCategory');

  return useMemo(() => {
    return regionCode === Region.TH && caseCategory === CaseCategory.BP_AP_CTG02;
  }, [caseCategory, regionCode]);
};
