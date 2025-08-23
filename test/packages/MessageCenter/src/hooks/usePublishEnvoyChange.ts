import { useContext, useCallback } from 'react';
import { PurposeCode, MCContext } from '@mc/index';

export default () => {
  const { subject } = useContext(MCContext);
  return useCallback((data) => {
    subject.next({
      data: {
        type: PurposeCode.MWReLoadBizDataSkipSnapshot,
        data,
      },
    });
  }, []);
};
