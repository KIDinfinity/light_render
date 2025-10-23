import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';

export default ({ isReject }: any) => {
  const appointmentDateList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData?.appointmentDateList
  );
  return useMemo(() => {
    return lodash
      .chain(appointmentDateList)
      .filter((item) => (isReject ? item.status === 'reject' : item.status !== 'reject'))
      .value();
  }, [isReject, appointmentDateList]);
};
