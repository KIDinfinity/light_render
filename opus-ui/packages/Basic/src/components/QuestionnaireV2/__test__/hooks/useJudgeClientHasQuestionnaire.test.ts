import { renderHook } from '@testing-library/react-hooks';
import useJudgeClientHasQuestionnaire from 'basic/components/QuestionnaireV2/hooks/useJudgeClientHasQuestionnaire';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn((func) => {
      const state = {
        questionnaireController: {
          processData: [
            {
              clientInfo: {
                clientId: 666,
              },
            },
          ],
          questionnaireKey: 'clientId',
        },
      };
      return func(state);
    }),
  };
});

describe('useJudgeClientHasQuestionnaire', () => {
  test('has client', () => {
    const renderer = renderHook(() =>
      useJudgeClientHasQuestionnaire({
        clientId: 666,
      })
    );

    expect(renderer.result.current).toBeTruthy();
  });
  test('has not clients', () => {
    const renderer = renderHook(() =>
      useJudgeClientHasQuestionnaire({
        clientId: 555,
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
});
