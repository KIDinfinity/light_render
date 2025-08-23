import { useEffect } from 'react';
import useSelectClientCallback from 'basic/components/Questionnaire/_hooks/useSelectClientCallback';

export default ({ selectedClientId, sectionHash }: any) => {
  const handleSelect = useSelectClientCallback({ clientId: selectedClientId });
  useEffect(() => {
    handleSelect();
  }, [sectionHash]);
};
