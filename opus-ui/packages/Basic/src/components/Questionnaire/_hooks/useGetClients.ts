import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import context from 'basic/components/Questionnaire/Context/context';

export default () => {
  const { state } = useContext(context);
  return useMemo(() => {
    return lodash
      .chain(state)
      .get('questionnaires', [])
      .map((item: any) => {
        return lodash.pick(item, ['firstName', 'surname', 'roleList', 'id', 'customerEnName']);
      })
      .value();
  }, [state]);
};
