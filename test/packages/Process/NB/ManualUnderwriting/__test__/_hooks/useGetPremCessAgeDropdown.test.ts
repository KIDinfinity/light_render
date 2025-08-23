import { renderHook } from '@testing-library/react-hooks';
import useGetPremCessAgeDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetPremCessAgeDropdown';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          premiumTerm: '10',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'D',
        },
        {
          premiumTerm: '40',
          premiumTermType: 'A',
          premiumTermDisplayType: 'D',
        },
      ];
    });
});

describe('useGetPremCessAgeDropdown', () => {
  test('get dropdown', () => {
    const renderer = renderHook(() =>
      useGetPremCessAgeDropdown({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toEqual([
      {
        dictCode: '10',
        dictName: '10',
      },
      {
        dictCode: '40',
        dictName: '40',
      },
    ]);
  });
});
