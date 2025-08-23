import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import QuestionnaireTitlesUI from './QuestionnaireTitlesUI';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

const QuestionnaireTitles = () => {
  const NAMESPACE = useGetNamespace();
  const dispatch = useDispatch();
  const error = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.error);
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

  const questionnaireList =
    customerQuestionnaireList
      ?.find((item) => item?.clientInfo?.[questionnaireKey] == selectClient)
      ?.questionnaireList?.filter((item) => item.sectionList)
      ?.map((item) => ({
        ...item,
        selected: selectQuestionnaire == item.questionnaireCode,
        error: !lodash.isEmpty(error[`${selectClient}${item.questionnaireCode}`]),
      })) || [];

  const handleSelect = (questionnaireCode: number) => {
    dispatch({
      type: `${NAMESPACE}/saveSelectQuestionnaire`,
      payload: {
        selectQuestionnaire: questionnaireCode,
      },
    });
  };
  return <QuestionnaireTitlesUI questionnaireList={questionnaireList} selectFn={handleSelect} />;
};

QuestionnaireTitles.displayName = 'QuestionnaireTitles';

export default QuestionnaireTitles;
