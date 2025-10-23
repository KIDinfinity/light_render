import { renderHook } from '@testing-library/react-hooks';
import useGetNtuDate from 'process/NB/PremiumSettlement/_hooks/useGetNtuDate';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              id: 'policy_id',
              ntuDate: '2022-11-11T10:50:06.000+0000',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              id: 'policy_id',
              ntuDate: 1668163806000,
            },
          ],
        };
      }),
  };
});

describe('useGetNtuDate', () => {
  test('Date parase', () => {
    const renderer = renderHook(() => useGetNtuDate());

    expect(renderer.result.current).toEqual('2022-11-11T10:50:06.000+0000');
  });

  test('milliseconds validate', () => {
    const renderer = renderHook(() => useGetNtuDate());
    expect(renderer.result.current).toEqual(1668163806000);
  });
});
