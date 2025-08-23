import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import useCheckClientQuestionnaire from '../_hooks/useCheckClientQuestionnaire';
import useJudgeClientHasQuestionnaire from 'basic/components/QuestionnaireV2/hooks/useJudgeClientHasQuestionnaire';
import Modal from './Modal';
import CheckButton from './CheckButton';
import { NAMESPACE } from '../activity.config';

const Questionnaire = (props: any) => {
  const { id, identityNo, identityType, clientId }: any = props;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const questionnaireKey = useSelector(
    ({ questionnaireController }: any) => questionnaireController.questionnaireKey
  );
  const questionnaireSwitch = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.questionnaireSwitch
  );

  const checkClientQuestionnaire = useCheckClientQuestionnaire({
    clientId: id,
  });

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const isDisplayQuestionnaireButton = useJudgeClientHasQuestionnaire({
    clientId: props[questionnaireKey],
  });
  return (
    <>
        <CheckButton
          onClick={async () => {
            if (!questionnaireSwitch) {
              setVisible(true);
              checkClientQuestionnaire();
            } else {
              await dispatch({
                type: 'questionnaireController/saveOtherPayload',
                payload: { identityNo, identityType, clientId },
              });
              await dispatch({
                type: 'questionnaireController/saveSelectClient',
                payload: { selectClient: props[questionnaireKey] },
              });
              await dispatch({
                type: 'questionnaireController/saveVisible',
                payload: { visible: true },
              });
            }
          }}
        />
      <Modal visible={visible} handleClose={handleClose} handleConfirm={handleClose} />
    </>
  );
};

Questionnaire.displayName = 'questionnaire';

export default Questionnaire;
