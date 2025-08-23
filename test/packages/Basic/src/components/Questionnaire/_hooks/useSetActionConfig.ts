import { useEffect, useContext } from 'react';
import context from 'basic/components/Questionnaire/Context/context';

export default ({ actionConfig }: any) => {
  const { dispatch } = useContext(context);
  useEffect(() => {
    dispatch({
      type: 'setActionConfig',
      payload: {
        actionConfig,
      },
    });
  }, [actionConfig]);
};
