import { useEffect } from 'react';
import useAddClientDetail from 'process/NB/ManualUnderwriting/_hooks/useAddClientDetail';

export default () => {
  const handleAddClient = useAddClientDetail();
  useEffect(() => {
    handleAddClient();
  }, []);
};
