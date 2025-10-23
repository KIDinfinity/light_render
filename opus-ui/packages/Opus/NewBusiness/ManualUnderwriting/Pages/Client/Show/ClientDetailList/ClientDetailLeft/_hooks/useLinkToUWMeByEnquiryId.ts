import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default ({ enquiryId }: any) => {
  const UWMeLinkAge = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.UWMeLinkAge,
    shallowEqual
  );

  return () => {
    window.open(`${UWMeLinkAge}/enquiryHistory?enquiryId=${enquiryId}`, '_blank');
  };
};
