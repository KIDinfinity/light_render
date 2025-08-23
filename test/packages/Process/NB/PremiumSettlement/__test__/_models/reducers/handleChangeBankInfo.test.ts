import handleChangeBankInfo from 'process/NB/PremiumSettlement/_models/reducers/handleChangeBankInfo';

jest.mock("uuid", () => ({
  v4: () => "mock-id",
}));


describe('handleChangeBankInfo', () => {
  test('change values type undefined', () => {
    const state = {
      bankList: [],
      businessData: {
        policyList: [
          {
            bankInfoList: [
              {
                id: '666',
                bankCode: '',
                type: undefined,
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields: {
          bankCode: '555',
        },
        id: '666',
      },
    };
    const result = handleChangeBankInfo(state, action);

    expect(result).toEqual({
      bankList: [],
      businessData: {
        policyList: [
          {
            bankInfoList: [
              {
                id: '666',
                bankCode: '',
                type: undefined,
              },
              {
                id: 'mock-id',
                bankCode: '555',
                type: 'W',
                bankName: '',
                bankAcctFactoryHouse: '',
              },
            ],
          },
        ],
      },
    });
  });
  test('refundPayType is BankTransfer & BankInfoList is Empty', () => {
    const changedFields = {
      bankName: 'City Bank',
    };
    const state = {
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields,
      },
    };
    const result = handleChangeBankInfo(state, action);
    expect(result).toEqual({
      businessData: {
        applicationNo: 'applicationNo',
        policyId: 'policyId',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: '',
                bankAcctNo: '',
                bankCode: '',
                bankAcctName: '',
                bankName: 'City Bank',
                policyId: 'policyId',
                type: 'W',
                id: 'mock-id',
                source: 'OWB',
                selection: 'Y',
              },
            ],
          },
        ],
      },
    });
  });

  test('handle change bankCode', () => {
    const changedFields = {
      bankCode: 'CB',
    };
    const state = {
      factoringHouseList: [
        {
          bankCode: 'CB',
          bankName: 'City Bank',
          factoringHouseCode: 'House',
          factoringHouseName: 'House',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: '',
                bankAcctNo: '',
                bankCode: '',
                bankAcctName: '',
                bankName: 'City Bank',
                policyId: 'policyId',
                type: 'W',
                id: '233',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields,
        id: '233',
      },
    };
    const result = handleChangeBankInfo(state, action);

    expect(result).toEqual({
      factoringHouseList: [
        {
          bankCode: 'CB',
          bankName: 'City Bank',
          factoringHouseCode: 'House',
          factoringHouseName: 'House',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: 'House',
                bankAcctNo: '',
                bankCode: 'CB',
                bankAcctName: '',
                bankName: 'City Bank',
                policyId: 'policyId',
                type: 'W',
                id: '233',
                source: 'OWB',
                selection: 'Y',
              },
            ],
          },
        ],
      },
    });
  });

  test('auto add w type bankInfo', () => {
    const changedFields = {
      bankCode: 'CB',
    };
    const state = {
      factoringHouseList: [
        {
          bankCode: 'CB',
          factoringHouseCode: 'House',
          bankName: 'City Bank',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: '',
                bankCode: 'CB',
                bankName: 'City Bank',
                bankAcctNo: '',
                bankAcctName: '',
                policyId: 'policyId',
                type: 'R',
                id: '233',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields,
        id: undefined,
      },
    };
    const result = handleChangeBankInfo(state, action);
    expect(result).toEqual({
      factoringHouseList: [
        {
          bankCode: 'CB',
          bankName: 'City Bank',
          factoringHouseCode: 'House',
        },
      ],
      businessData: {
        policyId: 'policyId',
        applicationNo: 'applicationNo',
        policyList: [
          {
            refundPayType: 'BTR',
            bankInfoList: [
              {
                policyId: 'policyId',
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: '',
                bankCode: 'CB',
                bankName: 'City Bank',
                bankAcctNo: '',
                bankAcctName: '',
                type: 'R',
                id: '233',
              },
              {
                type: 'W',
                bankCode: 'CB',
                bankName: 'City Bank',
                policyId: 'policyId',
                applicationNo: 'applicationNo',
                bankAcctFactoryHouse: 'House',
                bankAcctNo: '',
                bankAcctName: '',
                id: 'mock-id',
                source: 'OWB',
                selection: 'Y',
              },
            ],
          },
        ],
      },
    });
  });

  test('change values type R', () => {
    const state = {
      bankList: [],
      businessData: {
        policyList: [
          {
            bankInfoList: [
              {
                id: '666',
                bankCode: '',
                type: 'R',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        changedFields: {
          bankCode: '123666',
        },
        id: '666',
      },
    };
    const result = handleChangeBankInfo(state, action);

    expect(result).toEqual({
      bankList: [],
      businessData: {
        policyList: [
          {
            bankInfoList: [
              {
                id: '666',
                bankCode: '',
                type: 'R',
              },
              {
                id: 'mock-id',
                bankCode: '123666',
                type: 'W',
                bankName: '',
                bankAcctFactoryHouse: '',
              },
            ],
          },
        ],
      },
    });
  });
});
