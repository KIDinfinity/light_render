import { useContext, useMemo } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { safeParseUtil } from '@/utils/utils';
import context from 'basic/components/Questionnaire/Context/context';
import QuestionType from 'basic/components/Questionnaire/Constant/QuestionType';

export default () => {
  const { state } = useContext(context);

  return useMemo(() => {
    const selectedClientId = lodash.get(state, 'selectedClientId', 'clientId');
    const questionnaire = lodash
      .chain(state)
      .get('questionnaires', [])
      .find((item: any) => {
        return item.id === selectedClientId;
      })
      .pick(['text', 'questionList', 'id'])
      .value();
    const sections = lodash
      .chain(questionnaire)
      .get('questionList', [])
      .map((section: any) => {
        const questionList = lodash
          .chain(section)
          .get('questionList', [])
          .map((question: any) => {
            const { questionType, optionsList, answerList } = lodash.pick(question, [
              'questionType',
              'answerList',
              'optionsList',
            ]);
            switch (questionType) {
              case QuestionType.NUMBER:
              case QuestionType.OPTIONBACKED:
                if (lodash.isEmpty(optionsList) && lodash.isArray(answerList)) {
                  return {
                    ...question,
                    optionsList: answerList,
                  };
                }
                return question;
              case QuestionType.STRINGDATE:
                if (lodash.isEmpty(optionsList) && lodash.isArray(answerList)) {
                  return {
                    ...question,
                    optionsList: lodash.map(answerList, (item) => moment(item).format('L')),
                    answer: lodash.map(safeParseUtil(question?.answer), (item) =>
                      moment(item).format('L')
                    ),
                  };
                }
                return question;
              default:
                break;
            }
            return question;
          })
          .value();
        return {
          ...section,
          questionList,
        };
      })
      .value();
    return {
      name: questionnaire?.text,
      sections,
      id: questionnaire?.id,
    };
  }, [state]);
};
