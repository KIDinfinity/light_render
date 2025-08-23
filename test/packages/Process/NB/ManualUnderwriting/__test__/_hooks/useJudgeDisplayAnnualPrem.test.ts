import { renderHook } from '@testing-library/react-hooks';
import useJudgeDisplayAnnualPrem from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayAnnualPrem';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          productType: {
            value: 'RT',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productType: {
            value: 'AA',
          },
        },
      ];
    });
});

jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      queryValue: (object) => {
        return object?.value;
      },
    },
  };
});

describe('useJudgeDisplayAnnualPrem.ts', () => {
  test('has target product type', () => {
    const renderer = renderHook(() => useJudgeDisplayAnnualPrem());
    expect(renderer.result.current).toBeTruthy();
  });
  test('has not target product type', () => {
    const renderer = renderHook(() => useJudgeDisplayAnnualPrem());
    expect(renderer.result.current).not.toBeTruthy();
  });
});
