import { useContext, useEffect } from 'react';
import context from 'basic/components/Questionnaire/Context/context';

export default ({ questionnaireData }: any) => {
  const { dispatch } = useContext(context);
  useEffect(() => {
    dispatch({
      type: 'setQuestionnaire',
      payload: {
        questionnaires: questionnaireData,
      },
    });
  }, [questionnaireData]);
};
