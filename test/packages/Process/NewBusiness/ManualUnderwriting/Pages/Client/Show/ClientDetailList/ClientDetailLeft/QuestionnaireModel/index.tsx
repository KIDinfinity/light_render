import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Button } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import useJudgeClientHasQuestionnaire from 'basic/components/QuestionnaireV2/hooks/useJudgeClientHasQuestionnaire';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Modal from './Modal';
import styles from './index.less';

const CheckButton = ({ onClick }: any) => {
  return (
    <Button onClick={onClick} className={styles.checkButton}>
      {formatMessageApi({
        Label_BIZ_Policy: 'Questionaire',
      })}
    </Button>
  );
};

const Questionnaire = ({ clientId }: any) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const questionnaireKey = useSelector(
    ({ questionnaireController }: any) => questionnaireController.questionnaireKey
  );
  const questionnaireSwitch = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.questionnaireSwitch
  );
  const identityNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.identityNo
  );
  const identityType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.identityType
  );
  const smartClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.smartClientId
  );
  const map = {
    identityNo,
    identityType,
    clientId: smartClientId,
  };

  const checkClientQuestionnaire = async () => {
    if (!questionnaireSwitch) {
      setVisible(true);
      dispatch({
        type: `${NAMESPACE}/checkClientQuestionnaire`,
        payload: {
          selectedClientId: smartClientId,
        },
      });
    } else {
      await dispatch({
        type: 'questionnaireController/saveOtherPayload',
        payload: { identityNo, identityType, clientId: smartClientId },
      });
      await dispatch({
        type: 'questionnaireController/saveSelectClient',
        payload: { selectClient: map[questionnaireKey] },
      });
      await dispatch({
        type: 'questionnaireController/saveVisible',
        payload: { visible: true },
      });
    }
  };
  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const isDisplayQuestionnaireButton = useJudgeClientHasQuestionnaire({
    clientId: map[questionnaireKey],
  });

  return (!questionnaireSwitch || isDisplayQuestionnaireButton) ? (
    <div className={styles.questionaire}>
      {<CheckButton onClick={checkClientQuestionnaire} />}
      <Modal visible={visible} handleClose={handleClose} handleConfirm={handleClose} />
    </div>
  ) : null;
};

Questionnaire.displayName = 'questionnaire';

export default Questionnaire;
