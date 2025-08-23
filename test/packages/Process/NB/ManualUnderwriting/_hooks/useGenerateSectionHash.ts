import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

export default ({ clientId, visible }: any) => {
  return useMemo(() => {
    return uuid(clientId);
  }, [clientId, visible]);
};
