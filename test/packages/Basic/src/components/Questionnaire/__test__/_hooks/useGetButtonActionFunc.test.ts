import { renderHook } from '@testing-library/react-hooks';
import useGetButtonActionFunc from 'basic/components/Questionnaire/_hooks/useGetButtonActionFunc';

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useContext: jest.fn().mockImplementationOnce(() => {
      return {
        state: {
          actionConfig: {
            back: {
              action: () => {
                return 'action_result';
              },
            },
          },
        },
      };
    }),
  };
});
describe('get button action function', () => {
  test('get action', () => {
    const renderer = renderHook(() => {
      return useGetButtonActionFunc({
        buttonCode: 'back',
      });
    });
    const action = renderer.result.current;
    const result = action();
    expect(result).toEqual('action_result');
  });
});
