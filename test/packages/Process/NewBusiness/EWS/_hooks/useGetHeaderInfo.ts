import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';

export default () => {
  const caseDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.caseDetail,
    shallowEqual
  );
  return useMemo(() => {
    const info = lodash
      .chain(caseDetail)
      .pick([
        'processInstanceId',
        'caseCategory',
        'inquiryBusinessNo',
        'submissionDate',
        'submissionChannel',
        'originalSubmissionDate',
      ])
      .value();
    return info;
  }, [caseDetail]);
};
