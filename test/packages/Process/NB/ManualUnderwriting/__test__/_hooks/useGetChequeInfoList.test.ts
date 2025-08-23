import { renderHook } from '@testing-library/react-hooks';
import useGetChequeInfoList from 'process/NB/Share/hooks/useGetChequeInfoList';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');

  return {
    ...actual,
    useSelector: jest.fn().mockImplementationOnce(() => {
      return [
        {
          applicationNo: '',
          policyId: '',
          chequeNo: '',
          chequeAmount: 100.0, //decimal类型
          chequeDate: '', //date类型
          chequeIssueBank: '',
          chequeForMultipleApplication: '',
          chequeCurrency: '',
          chequeAllocationAmount: 100.0, //decimal类型
          verifyInd: 'N',
        },
      ];
    }),
  };
});

describe('useGetChequeInfoList', () => {
  test('get list', () => {
    const renderer = renderHook(() => useGetChequeInfoList());

    expect(renderer.result.current).toEqual([
      {
        applicationNo: '',
        policyId: '',
        chequeNo: '',
        chequeAmount: 100.0, //decimal类型
        chequeDate: '', //date类型
        chequeIssueBank: '',
        chequeForMultipleApplication: '',
        chequeCurrency: '',
        chequeAllocationAmount: 100.0, //decimal类型
        verifyInd: 'N',
      },
    ]);
  });
});
