import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import context from 'basic/components/Questionnaire/Context/context';

export default ({ buttonCode }: any) => {
  const { state } = useContext(context);
  return useMemo(() => {
    return lodash
      .chain(state)
      .get(`actionConfig.${buttonCode}.action`, () => {})
      .value();
  }, [buttonCode, state]);
};
