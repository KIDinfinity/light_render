import { useContext } from 'react';
import Context from 'basic/components/CaseContainer/Context';

export default () => {
  const { caseDetail } = useContext(Context);

  return caseDetail;
};
