import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import context from 'basic/components/Questionnaire/Context/context';

export default ({ clientId }: any) => {
  const { state } = useContext(context);
  return useMemo(() => {
    return lodash.chain(state).get('selectedClientId').isEqual(clientId).value();
  }, [state]);
};
