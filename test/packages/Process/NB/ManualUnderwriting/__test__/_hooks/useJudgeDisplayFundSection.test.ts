import { renderHook } from '@testing-library/react-hooks';
import useJudgeDisplayFundSection from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFundSection';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'Y',
          fundVisible: true,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          isMain: 'N',
          fundVisible: true,
        },
        {
          isMain: 'Y',
          fundVisible: false,
        },
      ];
    });
});

describe('useJudgeDisplayFundSection', () => {
  test('fundVisible is true', () => {
    const renderer = renderHook(() => {
      return useJudgeDisplayFundSection();
    });

    expect(renderer.result.current).toBeTruthy();
  });
  test('fundVisible is false', () => {
    const renderer = renderHook(() => {
      return useJudgeDisplayFundSection();
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
});
