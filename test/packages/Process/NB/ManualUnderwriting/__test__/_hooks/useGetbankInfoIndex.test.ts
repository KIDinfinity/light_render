import { renderHook } from '@testing-library/react-hooks';
import useGetbankInfoIndex from 'process/NB/ManualUnderwriting/_hooks/useGetbankInfoIndex';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn()
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              id: 'pp',
              bankInfoList: [],
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              id: 'pp',
              bankInfoList: [
                {
                  type: 'S',
                },
                {
                  type: 'R',
                },
              ],
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              id: 'pp',
              bankInfoList: [
                {
                  type: 'S',
                },
                {
                  type: 'G',
                },
                {
                  type: null,
                },
              ],
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              id: 'pp',
              bankInfoList: [
                {
                  type: 'S',
                },
                {
                  type: 'G',
                },
                {
                  type: undefined,
                },
              ],
            },
          ],
        };
      }),
  };
});

describe('useGetbankInfoIndex', () => {
  test('bankInfoList is not empty', () => {
    const renderer = renderHook(() =>
      useGetbankInfoIndex({
        type: 'R',
      })
    );
    expect(renderer.result.current).toEqual(-1);
  });
  test('match type', () => {
    const renderer = renderHook(() =>
      useGetbankInfoIndex({
        type: 'R',
      })
    );
    expect(renderer.result.current).toEqual(1);
  });
  test('match null type', () => {
    const renderer = renderHook(() =>
      useGetbankInfoIndex({
        type: 'R',
      })
    );

    expect(renderer.result.current).toEqual(2);
  });

  test('match null type', () => {
    const renderer = renderHook(() =>
      useGetbankInfoIndex({
        type: 'R',
      })
    );

    expect(renderer.result.current).toEqual(2);
  });
});
