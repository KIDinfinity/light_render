import { useEffect } from 'react';
import useCallPremiumEnquiry from 'process/NB/ManualUnderwriting/_hooks/useCallPremiumEnquiry';

export default ({ businessData }: any) => {
  const handleUpdate = useCallPremiumEnquiry();
  useEffect(() => {
    handleUpdate();
  }, [businessData, handleUpdate]);
};
