import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useJudgeHasQuestionnaire from './hooks/useJudgeHasQuestionnaire';
import useOpenModal from './hooks/useOpenModal';

export default function ShowButton({ className }: any) {
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
