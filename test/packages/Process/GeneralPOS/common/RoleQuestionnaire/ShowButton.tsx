import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useOpenModal from './hooks/useOpenModal';
import useJudgeHasQuestionnaire from './hooks/useJudgeHasQuestionnaire';
import styles from './index.less';

export default function ShowButton({  clientId }) {
  const openModal = useOpenModal({ clientId });
  const showButton = useJudgeHasQuestionnaire({ clientId });
  return (
    <>
      {showButton && (
        <Button className={styles.button} onClick={openModal}>
          {formatMessageApi({ Label_BIZ_Individual: 'Questionaire' })}
        </Button>
      )}
    </>
  );
}
