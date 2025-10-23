import { renderHook } from '@testing-library/react-hooks';
import useGetTransferButtonDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetTransferButtonDisabled';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetPremiumTransferList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          creator: 'MYSONU3',
          gmtModified: '2023-07-13T07:55:55.943+0000',
          amount: 233,
          transId: '29818ae4-0491-48dd-96ac-efa8ea10e00a',
          applicationNo: 'Test10EO23051101',
          transferNo: '03021540',
          modifier: '0',
          remark: null,
          gmtCreate: '2023-07-13T07:55:55.943+0000',
          targetPolicyId: 'BL242603',
          deleted: 0,
          policyId: 'EO2023051101',
          targetApplicationNo: 'DAI202306290007',
          id: '8b396f2f-cfdc-434f-bc50-f82a4fe048ba',
          status: 'failed',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          creator: 'MYSONU3',
          gmtModified: '2023-07-13T07:55:55.943+0000',
          amount: 233,
          transId: '29818ae4-0491-48dd-96ac-efa8ea10e00a',
          applicationNo: 'Test10EO23051101',
          transferNo: '03021540',
          modifier: '0',
          remark: null,
          gmtCreate: '2023-07-13T07:55:55.943+0000',
          targetPolicyId: 'BL242603',
          deleted: 0,
          policyId: 'EO2023051101',
          targetApplicationNo: 'DAI202306290007',
          id: '8b396f2f-cfdc-434f-bc50-f82a4fe048ba',
          status: 'success',
        },
      ];
    });
});

describe('useGetTransferButtonDisabled', () => {
  test('has failed status', () => {
    const renderer = renderHook(() => useGetTransferButtonDisabled());

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('all status success', () => {
    const renderer = renderHook(() => useGetTransferButtonDisabled());

    expect(renderer.result.current).toBeTruthy();
  });
});
