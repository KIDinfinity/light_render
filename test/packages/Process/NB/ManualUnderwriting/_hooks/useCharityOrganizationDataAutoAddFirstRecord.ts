import { useEffect } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { useSelector } from 'dva';
import useHandleAddCharityOrganizationCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleAddCharityOrganizationCallback';

export default () => {
  const charityOrganizationList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.businessData?.policyList[0]?.charityOrganizationList || []
  );
  const handleAdd = useHandleAddCharityOrganizationCallback();
  useEffect(() => {
    if (lodash.isEmpty(charityOrganizationList)) {
      handleAdd();
    }
  }, [charityOrganizationList, handleAdd]);
};
