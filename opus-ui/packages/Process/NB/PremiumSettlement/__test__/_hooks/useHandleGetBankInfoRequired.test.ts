import useHandleGetBankInfoRequired from 'process/NB/PremiumSettlement/_hooks/useHandleGetBankInfoRequired';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          premiumType: 'Premium Refund',
          policyList: [
            {
              refundPayType: 'BTR',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          premiumType: 'Premium Collection',
          policyList: [
            {
              refundPayType: 'CHQ',
            },
          ],
        };
      }),
  };
});

describe('test useHandleGetBankInfoRequired', () => {
  test('premiumType is Premium Refund and payType is BankTransfer', () => {
    const renderer = renderHook(() => useHandleGetBankInfoRequired({ type: 'collectionStatus' }));
    expect(renderer.result.current).toEqual(true);
  });
  test('premiumType is Premium Collection and payType is Cheque', () => {
    const renderer = renderHook(() =>
      useHandleGetBankInfoRequired({ type: 'createReceiptStatus' })
    );
    expect(renderer.result.current).toEqual(false);
  });
});
