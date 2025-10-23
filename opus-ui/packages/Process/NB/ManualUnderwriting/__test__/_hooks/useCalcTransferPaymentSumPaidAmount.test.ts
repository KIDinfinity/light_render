import { renderHook } from '@testing-library/react-hooks';
import useCalcTransferPaymentSumPaidAmount from 'process/NB/ManualUnderwriting/_hooks/useCalcTransferPaymentSumPaidAmount';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetPremiumTransferList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          amount: 111,
          status: 'success',
        },
        {
          amount: 233,
          status: 'success',
        },
        {
          amount: 2338,
          status: 'cancelled',
        },

        {
          amount: 666,
          status: 'failed',
        },
        {
          amount: 88,
        },
      ];
    });
});

describe('useCalcTransferPaymentSumPaidAmount', () => {
  test('calc transferd amount', () => {
    const renderer = renderHook(() => useCalcTransferPaymentSumPaidAmount());

    expect(renderer.result.current).toEqual(344);
  });
});
