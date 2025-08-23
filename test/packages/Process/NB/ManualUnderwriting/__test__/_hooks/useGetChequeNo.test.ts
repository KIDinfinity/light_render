import { renderHook } from '@testing-library/react-hooks';
import useGetChequeNo from 'process/NB/Share/hooks/useGetChequeNo';

jest.mock('process/NB/Share/hooks/useGetChequeInfoList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        chequeNo: '666',
        id: '444',
      },
    ];
  });
});
describe('useGetChequeNo', () => {
  test('get cheque no ', () => {
    const renderer = renderHook(() => useGetChequeNo());
    expect(renderer.result.current).toEqual('666');
  });
});
