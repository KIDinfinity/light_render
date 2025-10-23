import React from 'react';
import { useSelector } from 'dva';
import QuestionsUI from './QuestionsUI';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

const Questions = ({ disabled }: { disabled: boolean }) => {
  const NAMESPACE = useGetNamespace();
  const questionnaireKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.questionnaireKey
  );
  const selectClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.selectClient
  );
  const selectQuestionnaire = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.selectQuestionnaire
  );
  const customerQuestionnaireList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  );
  const error = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.error);

  const sectionQuestionListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.entities?.sectionQuestionListMap
    ) || {};

  // 获得当前问卷的数据，放置在问卷头部
  const { submissionDate, sourceType, totalScore, fundRiskLevel, investorType } =
    customerQuestionnaireList
      ?.find((item) => item.clientInfo?.[questionnaireKey] === selectClient)
      ?.questionnaireList?.find((item) => item.questionnaireCode === selectQuestionnaire) || {};
  // 获得当前问卷的所有问题，已经分层排序，section->questionMap [[questionMapA1,questionMapA2],[questionMapB2,questionMapB2]]
  const allSectionQuestionList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.sectionMap[`${selectClient}${selectQuestionnaire}`]
    ) || [];

  return (
    <QuestionsUI
      disabled={disabled}
      headerObj={{ submissionDate, sourceType, totalScore, fundRiskLevel, investorType, NAMESPACE }}
      allSectionQuestionList={allSectionQuestionList}
      sectionQuestionListMap={sectionQuestionListMap}
      error={error}
    />
  );
};

Questions.displayName = 'Questions';

export default Questions;
