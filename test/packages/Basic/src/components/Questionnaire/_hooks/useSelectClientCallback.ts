import { useContext, useCallback } from 'react';
import context from 'basic/components/Questionnaire/Context/context';

export default ({ clientId }: any) => {
  const { dispatch } = useContext(context);
  return useCallback(() => {
    dispatch({
      type: 'setSelectedClientId',
      payload: {
        selectedClientId: clientId,
      },
    });
  }, [clientId]);
};
