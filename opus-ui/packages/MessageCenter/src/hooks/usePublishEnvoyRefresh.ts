import { useContext, useCallback } from 'react';
import { PurposeCode, MCContext, LifeCircle } from '@mc/index';

export default () => {
  const { subject } = useContext(MCContext);
  return useCallback(() => {
    subject.next({
      lifeCircle: LifeCircle.OnMessage,
      data: {
        type: PurposeCode.refreshEnvoy,
      },
    });
  }, []);
};
