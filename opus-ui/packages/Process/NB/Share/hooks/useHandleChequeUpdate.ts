import { useEffect } from 'react';
import useRefreshChequeInfoCallback from 'process/NB/Share/hooks/useRefreshChequeInfoCallback';

export default ({ businessData }: any) => {
  const handleRefresh = useRefreshChequeInfoCallback();
  useEffect(() => {
    handleRefresh({ businessData });
  }, [businessData]);
};
