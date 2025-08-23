import { renderHook } from '@testing-library/react-hooks';
import useGetQuestionnaireBySelected from 'basic/components/Questionnaire/_hooks/useGetQuestionnaireBySelected';

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useContext: jest
      .fn(() => {})
      .mockImplementationOnce(() => {
        return {
          state: {
            questionnaires: [
              {
                id: '233',
                text: 'section',
                questionList: [
                  {
                    id: 'quesion first',
                  },
                ],
              },
            ],
            selectedClientId: '233',
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          state: {
            selectedClientId: '233',
            questionnaires: [
              {
                id: '233',
                text: 'desc',
                questionList: [
                  {
                    text: 'section',
                    questionList: [
                      {
                        questionType: 'NUMBER',
                        answerList: ['answerFirst'],
                        optionsList: null,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        };
      }),
  };
});

describe('test get questionnaire by clientId', () => {
  it('data is exits', () => {
    const renderer = renderHook(() => {
      return useGetQuestionnaireBySelected();
    });
    expect(renderer.result.current).toEqual({
      id: '233',
      name: 'section',
      sections: [
        {
          id: 'quesion first',
          questionList: [],
        },
      ],
    });
  });
  it('number type question', () => {
    const renderer = renderHook(() => useGetQuestionnaireBySelected());
    expect(renderer.result.current).toEqual({
      id: '233',
      name: 'desc',
      sections: [
        {
          text: 'section',
          questionList: [
            {
              questionType: 'NUMBER',
              answerList: ['answerFirst'],
              optionsList: ['answerFirst'],
            },
          ],
        },
      ],
    });
  });
});
