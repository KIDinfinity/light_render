import { useContext } from 'react';
import Context from 'basic/components/CaseContainer/Context';
import isGBSN from 'basic/components/CaseContainer/utils/isGBSN';

export default () => {
  const { caseDetail } = useContext(Context);

  return isGBSN({ caseCategory: caseDetail?.caseCategory });
};
