import { useEffect } from 'react';
import lodash from 'lodash';
import useLoadProductCodeConfig from 'process/NB/ManualUnderwriting/_hooks/useLoadProductCodeConfig';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import TaskStatus from 'enum/TaskStatus';
export default ({ businessData }: any) => {
  const handleLoadProductByPolicy = useLoadProductCodeConfig();
  const caseDetail = useGetCaseDetail();
  return useEffect(() => {
    if (
      lodash.includes([TaskStatus.todo, TaskStatus.pending], caseDetail.taskStatus) &&
      businessData.takeOverFlag === 'Y'
    ) {
      lodash
        .chain(businessData)
        .get('takeOverList', [])
        .map((item: any) => item?.policyNo)
        .uniq()
        .forEach((policyNo: string) => {
          handleLoadProductByPolicy(policyNo);
        })
        .value();
    }
  }, [businessData, useGetCaseDetail]);
};
