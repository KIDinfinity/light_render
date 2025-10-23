import { renderHook } from '@testing-library/react-hooks';
import useJudgeDisplayJointLifeColumn from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayJointLifeColumn';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [
        {
          jointLifeNo: '00',
        },
        {
          jointLifeNo: '01',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          jointLifeNo: '00',
        },
        {
          jointLifeNo: '01',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          jointLifeNo: '00',
        },
        {
          jointLifeNo: null,
        },
      ];
    });
});

describe('useJudgeDisplayJointLifeColumn', () => {
  test('has joint life coverage', () => {
    const renderer = renderHook(() => useJudgeDisplayJointLifeColumn());

    expect(renderer.result.current).toBeTruthy();
  });
  test('has no joint life coverage', () => {
    const renderer = renderHook(() => useJudgeDisplayJointLifeColumn());

    expect(renderer.result.current).not.toBeTruthy();
  });
});
