import { useMemo } from 'react';
import lodash from 'lodash';
import useGetQuestionnaireBySelected from 'basic/components/Questionnaire/_hooks/useGetQuestionnaireBySelected';

export default () => {
  const questionnaire = useGetQuestionnaireBySelected();
  return useMemo(() => {
    return lodash.get(questionnaire, 'sections', []);
  }, [questionnaire]);
};
