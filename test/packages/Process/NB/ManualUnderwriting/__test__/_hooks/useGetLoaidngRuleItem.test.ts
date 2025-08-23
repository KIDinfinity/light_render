import { renderHook } from '@testing-library/react-hooks';
import useGetLoadingRuleItem from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingRuleItem';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        id: 'coverageId',
        loadingRule: {
          addLoading: 'N',
        },
      },
    ];
  });
});

describe('useGetLoadingRuleItem', () => {
  test('get item', () => {
    const renderer = renderHook(() =>
      useGetLoadingRuleItem({
        coverageId: 'coverageId',
        key: 'addLoading',
      })
    );
    expect(renderer.result.current).toEqual('N');
  });
});
