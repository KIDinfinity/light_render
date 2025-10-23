// packages/Opus/NewBusiness/ManualUnderwriting/_models/reducers/payment/saveBankInfo.ts
import saveBankInfo from 'opus/NewBusiness/ManualUnderwriting/_models/reducers/payment/saveBankInfo';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('saveBankInfo reducer', () => {
  it('should add a new bank info when id is not found', () => {
    const initialState = {
      modalData: {
        processData: {
          planInfoData: {
            bankInfoList: [],
          },
        },
      },
    };

    const action = {
      payload: {
        changedFields: { bankCode: '001', branchCode: '123', accountName: 'John Doe' },
        id: null,
        type: 'I',
      },
    };

    const result = saveBankInfo(initialState, action);

    expect(result.modalData.processData.planInfoData.bankInfoList).toEqual([
      {
        bankCode: '001',
        branchCode: '123',
        accountName: 'John Doe',
        id: 'mock-uuid',
        type: 'I',
      },
    ]);
  });

  it('should update an existing bank info when id is found', () => {
    const initialState = {
      modalData: {
        processData: {
          planInfoData: {
            bankInfoList: [
              { id: 'mock-uuid', bankCode: '001', branchCode: '123', accountName: 'John Doe' },
            ],
          },
        },
      },
    };

    const action = {
      payload: {
        changedFields: { accountName: 'Jane Doe' },
        id: 'mock-uuid',
        type: 'I',
      },
    };

    const result = saveBankInfo(initialState, action);

    expect(result.modalData.processData.planInfoData.bankInfoList).toEqual([
      {
        id: 'mock-uuid',
        bankCode: '001',
        branchCode: '123',
        accountName: 'Jane Doe',
      },
    ]);
  });

  it('should handle renewalPayType update', () => {
    const initialState = {
      modalData: {
        processData: {
          planInfoData: {
            renewalPayType: null,
          },
        },
      },
    };

    const action = {
      payload: {
        changedFields: { renewalPayType: 'CreditCard' },
        id: null,
        type: null,
      },
    };

    const result = saveBankInfo(initialState, action);

    expect(result.modalData.processData.planInfoData.renewalPayType).toBe('CreditCard');
  });
});
