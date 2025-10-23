import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useOpenModal from 'process/NB/components/AgentQuestionnaire/hooks/useOpenModal';
import useJudgeHasQuestionnaire from 'process/NB/components/AgentQuestionnaire/hooks/useJudgeHasQuestionnaire';

export default function ShowButton({ className }) {
  const openModal = useOpenModal();
  const showButton = useJudgeHasQuestionnaire();
  return (
    <>
      {showButton && (
        <Button className={className} onClick={openModal}>
          {formatMessageApi({ Label_BPM_Button: 'agtconfidentialreport' })}
        </Button>
      )}
    </>
  );
}
