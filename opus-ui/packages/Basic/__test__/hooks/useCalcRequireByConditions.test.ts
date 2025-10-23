import { renderHook } from '@testing-library/react-hooks';
import useCalcRequireByConditions from 'process/NB/ManualUnderwriting/_hooks/useCalcRequireByConditions';

const conditionsConfig = {
  combine: '&&',
  conditions: [
    {
      left: {
        domain: '$basicProduct',
        field: 'coreCode',
      },
      operator: 'in',
      right: ['IL09', 'EN02', 'EN04', 'EN05'],
    },
  ],
};

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          coreCode: 'IL09',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          coreCode: 'IL0999999',
        },
      ];
    });
});

describe('useCalcRequireByConditions', () => {
  test('includues target product', () => {
    const renderer = renderHook(() => useCalcRequireByConditions({ conditionsConfig }));
    expect(renderer.result.current).toBeTruthy();
  });
  test('not include target product', () => {
    const renderer = renderHook(() => useCalcRequireByConditions({ conditionsConfig }));
    expect(renderer.result.current).not.toBeTruthy();
  });
});
