import { renderHook } from '@testing-library/react-hooks';
import useGetCurrentCoverage from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverage';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: () => {
      return {
        policyList: [
          {
            coverageList: [
              {
                id: '233',
                coverageInsuredList: [],
              },
            ],
          },
        ],
      };
    },
  };
});

describe('useGetCurrentCoverage', () => {
  test('get current coverage', () => {
    const renderer = renderHook(() => useGetCurrentCoverage({ id: '233' }));
    expect(renderer.result.current).toEqual({
      id: '233',
      coverageInsuredList: [],
    });
  });
});
