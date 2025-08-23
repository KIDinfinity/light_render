import { useCallback } from 'react';
import useGetEnquiryId from 'process/NB/ManualUnderwriting/_hooks/useGetEnquiryId';
import useGetUWMeLinkAge from 'process/NB/ManualUnderwriting/_hooks/useGetUWMeLinkAge';

export default ({ clientId }: any) => {
  const enquiryId = useGetEnquiryId({ clientId });
  const UWMeLinkAge = useGetUWMeLinkAge();
  return useCallback(() => {
    window.open(`${UWMeLinkAge}/enquiryHistory?enquiryId=${enquiryId}`, '_blank');
  }, [enquiryId, UWMeLinkAge]);
};
