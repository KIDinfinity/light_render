import { renderHook } from '@testing-library/react-hooks';
import useJudgeInsuredIsPI from 'process/NB/ManualUnderwriting/_hooks/useJudgeInsuredIsPI';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn(() => {
    return [
      {
        id: 'coverage1',
        coverageInsuredList: [
          {
            clientId: 'PIClient',
          },
        ],
        isMain: 'Y',
      },
      {
        id: 'coverage2',
        coverageInsuredList: [
          {
            clientId: 'PIClient',
          },
        ],
      },
      {
        id: 'coverage3',
        coverageInsuredList: [
          {
            clientId: 'notPI',
          },
        ],
      },
    ];
  });
});

describe('useJudgeInsuredIsPI', () => {
  test('is PI', () => {
    const renderer = renderHook(() => {
      return useJudgeInsuredIsPI({
        coverageId: 'coverage2',
      });
    });

    expect(renderer.result.current).toBeTruthy();
  });

  test('not PI', () => {
    const renderer = renderHook(() => {
      return useJudgeInsuredIsPI({
        coverageId: 'coverage3',
      });
    });

    expect(renderer.result.current).not.toBeTruthy();
  });
});
