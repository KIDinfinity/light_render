import { renderHook } from '@testing-library/react-hooks';
import useGetRiskAgeDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetRiskAgeDropdown';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '50',
          policyTermType: 'A',
          policyTermDisplayType: 'D',
        },
        {
          policyTerm: '60',
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
      ];
    });
});

describe('useGetRiskAgeDropdown', () => {
  test('get dropdown', () => {
    const renderer = renderHook(() =>
      useGetRiskAgeDropdown({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toEqual([
      {
        dictCode: '50',
        dictName: '50',
      },
      {
        dictCode: '60',
        dictName: '60',
      },
    ]);
  });
});
