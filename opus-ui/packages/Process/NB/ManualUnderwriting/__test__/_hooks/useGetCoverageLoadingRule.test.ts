import { renderHook } from '@testing-library/react-hooks';
import useGetCoverageLoadingRule from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageLoadingRule';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn().mockImplementationOnce(() => [
    {
      id: 'coverageId',
      value: 233,
      loadingRule: {
        ruleFirst: 'test',
      },
    },
  ]);
});

describe('useGetCoverageLoadingRule', () => {
  test('get loading rule', () => {
    const renderer = renderHook(() => useGetCoverageLoadingRule({ coverageId: 'coverageId' }));
    expect(renderer.result.current).toEqual({
      ruleFirst: 'test',
    });
  });
});
