import { useContext } from 'react';
import Context from 'basic/components/Elements/Context';

export default () => {
  const { caseCategory, activityCode } = useContext(Context);

  return { caseCategory, activityCode };
};
