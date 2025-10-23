import { renderHook } from '@testing-library/react-hooks';
import useGetIncreasedCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetIncreasedCoverageList';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelectedResult', () => {
  return jest.fn(() => {
    return {
      policyList: [
        {
          coverageList: [
            {
              id: '123',
            },
          ],
        },
      ],
    };
  });
});
describe('useGetIncreasedCoverageList', () => {
  test('test useGetIncreasedCoverageList', () => {
    const renderer = renderHook(() => {
      return useGetIncreasedCoverageList();
    });
    expect(renderer.result.current).toEqual([
      {
        id: '123',
      },
    ]);
  });
});
