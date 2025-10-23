import { renderHook } from '@testing-library/react-hooks';
import useGetCurrentPolicyCheuqeData from 'process/NB/Share/hooks/useGetCurrentPolicyCheuqeData';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn().mockImplementationOnce(() => {
      return {
        policyList: [
          {
            id: 'target-policy-222',
            policyId: 'target-policy',
            chequeInfoList: [],
          },
        ],
      };
    }),
  };
});

jest.mock('process/NB/Share/hooks/useGetChequeInfoList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        id: 'cheque-id',
        policyId: 'target-policy',
        applicationNo: '666',
        chequeNo: '444',
        chequeAmount: 100.0, //decimal类型
        chequeDate: '2022-01-01', //date类型
        chequeIssueBank: '',
        chequeForMultipleApplication: '',
        chequeCurrency: '5656',
        chequeAllocationAmount: 100.0, //decimal类型
        verifyInd: 'Y',
      },
      {
        id: 'cheque-id-666',
        policyId: 'pocliy-id-666',
        applicationNo: '',
        chequeNo: '',
        chequeAmount: 100.0, //decimal类型
        chequeDate: '', //date类型
        chequeIssueBank: '',
        chequeForMultipleApplication: '',
        chequeCurrency: '',
        chequeAllocationAmount: 100.0, //decimal类型
        verifyInd: 'Y',
      },
    ];
  });
});

describe('useGetCurrentPolicyCheuqeData', () => {
  test('get current policy cheque', () => {
    const renderer = renderHook(() => useGetCurrentPolicyCheuqeData());

    expect(renderer.result.current).toEqual({
      id: 'cheque-id',
      policyId: 'target-policy',
      applicationNo: '666',
      chequeNo: '444',
      chequeAmount: 100.0, //decimal类型
      chequeDate: '2022-01-01', //date类型
      chequeIssueBank: '',
      chequeForMultipleApplication: '',
      chequeCurrency: '5656',
      chequeAllocationAmount: 100.0, //decimal类型
      verifyInd: 'Y',
    });
  });
});
