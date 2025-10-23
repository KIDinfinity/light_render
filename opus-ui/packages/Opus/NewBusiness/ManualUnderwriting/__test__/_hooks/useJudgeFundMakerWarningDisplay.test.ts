jest.mock('dva', () => ({ useSelector: jest.fn() }));

import { useSelector } from 'dva';
import { renderHook } from '@testing-library/react-hooks';
import useJudgeFundMakerWarningDisplay from 'opus/NewBusiness/ManualUnderwriting/_hooks/useJudgeFundMakerWarningDisplay';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

describe('useJudgeFundMakerWarningDisplay', () => {
  it('should return true when fundMaker exists and is not the same as getTask.assignee', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      // 模拟 state 数据
      const mockState = {
        [NAMESPACE]: { processData: { fundMaker: 'fundMaker1' } },
        processTask: { getTask: { assignee: 'assignee2' } },
      };

      // 根据 selectorFn 的行为返回对应的值
      return selectorFn(mockState);
    });

    const { result } = renderHook(() => useJudgeFundMakerWarningDisplay());
    expect(result.current).toBe(true);
  });

  it('should return false when fundMaker does not exist', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      const mockState = {
        [NAMESPACE]: { processData: { fundMaker: null } },
        processTask: { getTask: { assignee: 'assignee2' } },
      };

      return selectorFn(mockState);
    });

    const { result } = renderHook(() => useJudgeFundMakerWarningDisplay());
    expect(result.current).toBe(false);
  });

  it('should return false when fundMaker is the same as getTask.assignee', () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      const mockState = {
        [NAMESPACE]: { processData: { fundMaker: 'assignee1' } },
        processTask: { getTask: { assignee: 'assignee1' } },
      };

      return selectorFn(mockState);
    });

    const { result } = renderHook(() => useJudgeFundMakerWarningDisplay());
    expect(result.current).toBe(false);
  });
});
