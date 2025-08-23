import useJudgeDisplayFinancialInfoTable from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFinancialInfoTable';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest
    .fn(() => {
      return {};
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: '233',
          usTaxFlag: 'Y',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: '233',
          usTaxFlag: 'N',
        },
      ];
    });
});
describe('useJudgeDisplayFinancialInfoTable', () => {
  test('usTaxFlag = Y ', () => {
    const renderer = renderHook(() =>
      useJudgeDisplayFinancialInfoTable({
        clientId: '233',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('usTaxFlag = N', () => {
    const renderer = renderHook(() =>
      useJudgeDisplayFinancialInfoTable({
        clientId: '233',
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
});
