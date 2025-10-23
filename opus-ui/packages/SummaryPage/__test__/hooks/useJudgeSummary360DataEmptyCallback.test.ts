import { renderHook } from '@testing-library/react-hooks';
import useJudgeSummary360DataEmptyCallback from 'summary/hooks/useJudgeSummary360DataEmptyCallback';
jest.mock('react', () => {
  const actual = jest.requireActual('react');

  return {
    ...actual,
    useContext: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          state: {
            c360: {
              sideBarOverallList: [
                {
                  keyClientId: '666',
                  policyInfoList: [
                    {
                      policyId: '22',
                    },
                  ],
                  coverageList: [
                    {
                      coverageId: '66',
                    },
                  ],
                },
              ],
            },
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          state: {
            c360: {
              sideBarOverallList: [
                {
                  keyClientId: '666',
                  policyInfoList: undefined,
                  coverageList: undefined,
                },
              ],
            },
          },
        };
      })
      .mockImplementationOnce(() => {
        return {
          state: {
            c360: {
              sideBarOverallList: [
                {
                  keyClientId: '666',
                  policyInfoList: [],
                  coverageList: [],
                },
              ],
            },
          },
        };
      }),
  };
});
describe('useJudgeSummary360DataEmptyCallback', () => {
  test('match client id & data not empty', () => {
    const renderer = renderHook(() => {
      return useJudgeSummary360DataEmptyCallback();
    });
    const func = renderer.result.current;
    const isEmpty = func({
      clientId: '666',
    });
    expect(isEmpty).not.toBeTruthy();
  });

  test('data is undefined', () => {
    const renderer = renderHook(() => {
      return useJudgeSummary360DataEmptyCallback();
    });
    const func = renderer.result.current;
    const isEmpty = func({
      clientId: '666',
    });
    expect(isEmpty).toBeTruthy();
  });

  test('data is empty array', () => {
    const renderer = renderHook(() => {
      return useJudgeSummary360DataEmptyCallback();
    });
    const func = renderer.result.current;
    const isEmpty = func({
      clientId: '666',
    });
    expect(isEmpty).toBeTruthy();
  });
});
