import useGetPaymentListByPaymentMethodType from 'process/NB/PremiumSettlement/_hooks/useGetPaymentListByPaymentMethodType';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');

  return {
    ...actual,
    useSelector: jest.fn().mockImplementationOnce(() => {
      return {
        policyList: [
          {
            id: ' ppp',
            paymentMethodType: 'Online',
            defaultRefundPayType: '',
            premiumPaymentCfgList: [
              {
                id: '44160bb9-c01c-42e1-bfc3-8d18e89c8cbc',
                creator: 'jennifer',
                gmtCreate: '2021-06-23T15:00:00.000+0000',
                modifier: 'jennifer',
                gmtModified: '2021-06-23T15:00:00.000+0000',
                deleted: 0,
                transId: '38fe3781-eaf7-4b31-b9ae-c4f016e9c853',
                region: 'KH',
                premiumAction: 'Premium Refund',
                paymentCode: 'PAY',
                paymentMethod: 'Pay Way',
                paymentMethodType: 'Online',
                applicable: 'Y',
                bankCode: null,
                merchantId: null,
              },
              {
                id: 'e587b8ac-0426-4dd3-836e-63079c3f0c22',
                creator: 'jennifer',
                gmtCreate: '2021-06-23T15:00:00.000+0000',
                modifier: 'jennifer',
                gmtModified: '2021-06-23T15:00:00.000+0000',
                deleted: 0,
                transId: '38fe3781-eaf7-4b31-b9ae-c4f016e9c853',
                region: 'KH',
                premiumAction: 'Premium Refund',
                paymentCode: 'BTR',
                paymentMethod: 'Bank Transfer',
                paymentMethodType: 'Offline',
                applicable: 'Y',
                bankCode: null,
                merchantId: null,
              },
              {
                id: 'f4b4c25a-d42c-4a5a-af15-54523952e351',
                creator: 'jennifer',
                gmtCreate: '2021-06-23T15:00:00.000+0000',
                modifier: 'jennifer',
                gmtModified: '2021-06-23T15:00:00.000+0000',
                deleted: 0,
                transId: '38fe3781-eaf7-4b31-b9ae-c4f016e9c853',
                region: 'KH',
                premiumAction: 'Premium Refund',
                paymentCode: 'CHQ',
                paymentMethod: 'Cheque',
                paymentMethodType: 'Offline',
                applicable: 'Y',
                bankCode: null,
                merchantId: null,
              },
            ],
          },
        ],
      };
    }),
  };
});

jest.mock('@/components/Tenant', () => {
  return {
    tenant: {
      region: jest
        .fn()
        .mockImplementationOnce(() => 'ID')
        .mockImplementationOnce(() => 'ID')
        .mockImplementationOnce(() => 'PH')
        .mockImplementationOnce(() => 'PH')
        .mockImplementationOnce(() => 'ID')
        .mockImplementationOnce(() => 'TH'),
    },
    Region: {
      TH: 'TH',
    },
  };
});

describe('useGetPaymentListByPaymentMethodType', () => {
  test('filter logic', () => {
    const renderer = renderHook(() => useGetPaymentListByPaymentMethodType());
    expect(renderer.result.current).toEqual([
      {
        id: '44160bb9-c01c-42e1-bfc3-8d18e89c8cbc',
        creator: 'jennifer',
        gmtCreate: '2021-06-23T15:00:00.000+0000',
        modifier: 'jennifer',
        gmtModified: '2021-06-23T15:00:00.000+0000',
        deleted: 0,
        transId: '38fe3781-eaf7-4b31-b9ae-c4f016e9c853',
        region: 'KH',
        premiumAction: 'Premium Refund',
        paymentCode: 'PAY',
        paymentMethod: 'Pay Way',
        paymentMethodType: 'Online',
        applicable: 'Y',
        bankCode: null,
        merchantId: null,
      },
    ]);
  });
});
